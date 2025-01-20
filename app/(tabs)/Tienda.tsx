import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../components/firebase'; 
import { useNavigation } from '@react-navigation/native';
import styles from '../components/styles';

const TiendaScreen = () => {
  const navigation = useNavigation();
  const [salesData, setSalesData] = useState<any[]>([]); 
  const [loading, setLoading] = useState(true); 

  
  const noImagePath = require('../assets/images/no-image.jpg');
  const addIcon = require('../assets/images/añadir.png'); 

  
  const fetchSalesData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Tienda')); 
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); 
      setSalesData(data); 
    } catch (error) {
      console.error('Error al obtener los datos de ventas:', error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.emptyText}>Cargando datos...</Text>
      ) : salesData.length === 0 ? (
        <Text style={styles.emptyText}>No hay ventas registradas.</Text>
      ) : (
        <FlatList
          data={salesData}
          keyExtractor={(item) => item.id}
          numColumns={2} 
          columnWrapperStyle={styles.row} 
          renderItem={({ item }) => (
            <View style={styles.saleItem}>
              <Image
                source={item.imagenes ? { uri: item.imagenes } : noImagePath}
                style={styles.imageTiend}
              />
              <View>
                <View style={styles.row}>
                  <Text style={styles.textLeft}>{item.tipo}</Text>
                  <Text style={styles.textRight}>{item.precioCompleto}€</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.textLeft}>{item.ubicacion}</Text>
                  <Text style={styles.textRight}>{item.numero}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.textLeft}>Edad</Text>
                  <Text style={styles.textRight}>{item.edad || 'No disponible'}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Venta')} 
      >
        <Image source={addIcon} style={styles.addIcon} />  
      </TouchableOpacity>
    </View>
  );
};


  

export default TiendaScreen;
