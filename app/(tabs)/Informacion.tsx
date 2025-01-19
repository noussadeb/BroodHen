import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../components/styles';
import Header from '../components/Header';

const birds = [
  { id: 1, name: 'Pavo Real', image: require('../../assets/images/Pavo_Real.jpg'), info: 'معلومات عن Pavo Real...' },
  { id: 2, name: 'Pollo sedosos', image: require('../../assets/images/pol_sel.jpg'), info: 'معلومات عن Pollo sedosos...' },
  { id: 3, name: 'Pollo sussex moteado', image: require('../../assets/images/sussex_moteado.jpg'), info: 'معلومات عن Pollo sussex moteado...' },
  { id: 4, name: 'Avestruz', image: require('../../assets/images/Avestruz.jpg'), info: 'معلومات عن Avestruz...' },
  { id: 5, name: 'Patos', image: require('../../assets/images/Patos.jpg'), info: 'معلومات عن Patos...' },
  { id: 6, name: 'Gansos', image: require('../../assets/images/Gansos.jpg'), info: 'معلومات عن Gansos...' },
];

const InformacionScreen = () => {
  const navigation = useNavigation();

  const handlePress = (bird) => {
    console.log('Navigating to InfPollo with:', bird.name, bird.info); // Debugging info
    navigation.navigate('InfPollo', { name: bird.name, info: bird.info });

  };

  return (
    <ScrollView contentContainerStyle={styles.containerInf}>
      {birds.map((bird) => (
        <View key={bird.id} style={styles.item}>
          <Image source={bird.image} style={styles.image} />
          <TouchableOpacity
            style={styles.buton}
            onPress={() => handlePress(bird)}
          >
            <Text style={styles.butonText}>{bird.name}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};



export default InformacionScreen;
