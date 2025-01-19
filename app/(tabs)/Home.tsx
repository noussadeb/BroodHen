import React, { useState, useEffect } from 'react';
import { View, Text, Image, Alert, TextInput, Modal, Button, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { onSnapshot, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../components/firebase';
import Header from '../components/Header';
import styles from '../components/styles';


const MainScreen = () => {
  const [incubationCycles, setIncubationCycles] = useState([]);
  const [currentCycleIndex, setCurrentCycleIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [remainingEggs, setRemainingEggs] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [markedDates, setMarkedDates] = useState({});
  const [temperature, setTemperature] = useState('N/A');
  const [humidity, setHumidity] = useState('N/A');



  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'NuevaEcl'),
      (snapshot) => {
        const cycles = snapshot.docs.map((doc) => {
          const cycle = { id: doc.id, ...doc.data() };
          const startIncubationDate = new Date(cycle.incubationDate);
          const dayAfter21 = new Date(startIncubationDate);
          dayAfter21.setDate(startIncubationDate.getDate() + 21); 
  
          const today = new Date();
  
          
          if (today > dayAfter21) {
            return null; 
          }
  
          
          return cycle;
        }).filter(cycle => cycle !== null); 
  
        setIncubationCycles(cycles);
      },
      (error) => {
        console.error('Error fetching incubation cycles:', error);
      }
    );
  
    return () => unsubscribe();
  }, []);
  

  const currentCycle = incubationCycles[currentCycleIndex] || {};

  const getEggImage = (incubationDate) => {
  const dayNumber = calculateDayNumber(incubationDate);

  if (dayNumber <= 3) {
    return require('../assets/images/ouevos1.jpg'); 
  } else if (dayNumber <= 18) {
    return require('../assets/images/ouevos2.jpg'); 
  } else {
    return require('../assets/images/ouevos2.jpg'); 
  }
};


useEffect(() => {
  if (!currentCycle || !currentCycle.incubationDate) {
    setMarkedDates({});
    setTemperature('N/A');
    setHumidity('N/A');
    return;
  }

  const incubationDate = new Date(currentCycle.incubationDate); 
  if (isNaN(incubationDate)) { 
    console.error('Invalid incubation date:', currentCycle.incubationDate);
    return;
  }

  setMarkedDates(generateMarkedDates(currentCycle.incubationDate, currentCycle.eggCount));
  const dayNumber = calculateDayNumber(incubationDate);
  if (dayNumber <= 18) {
    setTemperature('37.5°C');
    setHumidity('65%');
  } else if (dayNumber <= 21) {
    setTemperature('38.5°C');
    setHumidity('75%');
  } else {
    setTemperature('N/A');
    setHumidity('N/A');
  }
}, [currentCycle]);


  
  const getEggTurningIcon = (incubationDate) => {
    const dayNumber = calculateDayNumber(incubationDate);
    if (dayNumber >= 4 && dayNumber <= 18) {
      return require('../assets/images/Volteando.png');
    } else {
      return require('../assets/images/nonVolteando.png'); 
    }
  };

  const handleDayPress = (day) => {
    if (
      !markedDates[day.dateString] || 
      !markedDates[day.dateString].color || 
      !markedDates[day.dateString].color.includes('255, 182, 193')
    ) {
      Alert.alert('Invalid Day', 'No valid incubation data for this day.');
      return;
    }
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };



  const calculateDayNumber = (startDate) => {
    if (!startDate) return 0;
    const today = new Date();
    const start = new Date(startDate);
    return Math.floor((today - start) / (1000 * 3600 * 24)) + 1;
  };
  const generateMarkedDates = (startDate, eggCount) => {
    const marked = {};
    if (!startDate) return marked;
  
    const hatchingDate = new Date(startDate);
    hatchingDate.setDate(hatchingDate.getDate() + 21);
    const today = new Date().toISOString().split('T')[0];
  
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(today)) {
      const dateString = currentDate.toISOString().split('T')[0];
      marked[dateString] = {
        color: eggCount?.[dateString] ? 'rgba(0, 255, 127, 0.5)' : 'rgba(255, 182, 193, 0.5)',
        textColor: 'black',
      };
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    marked[startDate] = { startingDay: true, color: 'rgba(0, 123, 255, 0.5)', textColor: 'white' };
    marked[hatchingDate.toISOString().split('T')[0]] = {
      marked: true,
      customStyles: {
        container: { backgroundColor: 'transparent', borderRadius: 50, borderColor: 'red', borderWidth: 2 },
        text: { color: 'red', fontWeight: 'bold' },
      },
    };
  
    return marked;
};





  const handleSaveEggCount = async () => {
    try {
      const docRef = doc(db, 'NuevaEcl', currentCycle.id);
      const eggCount = { ...(currentCycle.eggCount || {}) };
      eggCount[selectedDate] = parseInt(remainingEggs);
      await updateDoc(docRef, { eggCount });
      Alert.alert('Success', 'Egg count updated successfully.');
    } catch (error) {
      console.error('Error updating egg count:', error);
      Alert.alert('Error', 'Failed to update egg count.');
    } finally {
      setModalVisible(false);
      setRemainingEggs('');
    }
  };

  return (
    <View style={styles.container}>
      {/*<Header onMenuPress={() => alert('Menu clicked')} />*/}
      <Text style={styles.title}>{currentCycle.type || 'N/A'}</Text>
      <View style={styles.topSection}>
        <View style={styles.indicator}>
          <Image source={require('../assets/images/humedite.png')} style={styles.icon} />
          <Text style={styles.value}>{humidity}</Text>
        </View>
        <View style={styles.eggContainer}>
        <Image source={require('../assets/images/pollo.png')} style={styles.eggImage} />
          <View style={styles.eggImageContainer}>
          
            <Image
              source={getEggTurningIcon(currentCycle.incubationDate)} 
              style={styles.eggTurningIcon}
              
            /> 
          </View>
          
          <Text style={styles.remainingDays}>
            {21 - calculateDayNumber(currentCycle.incubationDate)}
            
          </Text>
        </View>

        <View style={styles.indicator}>
          <Image source={require('../assets/images/temperatura.png')} style={styles.icon} />
          <Text style={styles.value}>{temperature}</Text>
        </View>
      </View>
      

      <Header onMenuPress={() => alert('Menu clicked')} />
      

      <Calendar
        markingType="period"
        markedDates={markedDates}
        onDayPress={handleDayPress}
        theme={{
          selectedDayBackgroundColor: 'rgba(0, 123, 255, 0.7)',
          todayTextColor: '#007BFF',
          arrowColor: 'blue',
        }}
      />

      <View style={styles.iconButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            if (currentCycleIndex > 0) {
              setCurrentCycleIndex((prevIndex) => prevIndex - 1);
            }
          }}
        >
          <Image
            source={require('../assets/images/decrease.png')}
            style={styles.iconButton}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.huevosButton}
          onPress={() => alert('Huevos button pressed')}
        >
          <Text style={styles.huevosButtonText}>Huevos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            if (currentCycleIndex < incubationCycles.length - 1) {
              setCurrentCycleIndex((prevIndex) => prevIndex + 1);
            }
          }}
        >
          <Image
            source={require('../assets/images/increase.png')}
            style={styles.iconButton}
          />
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text>Enter remaining eggs for {selectedDate}:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={remainingEggs}
        onChangeText={setRemainingEggs}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.huevosButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.huevosButton} onPress={handleSaveEggCount}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>


    </View>
  );
};




export default MainScreen; 