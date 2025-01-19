import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../components/firebase'; // إعدادات Firebase
import { useNavigation } from '@react-navigation/native';
import styles from '../components/styles';

const TiendaScreen = () => {
  const navigation = useNavigation();
  const [salesData, setSalesData] = useState<any[]>([]); // البيانات المسجلة
  const [loading, setLoading] = useState(true); // حالة التحميل

  // المسار الافتراضي للصورة
  const noImagePath = require('../../assets/images/no-image.jpg');
  const addIcon = require('../../assets/images/añadir.png'); // إضافة الأيقونة

  // جلب البيانات من Firestore
  const fetchSalesData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Tienda')); // قراءة البيانات
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // تحويل إلى مصفوفة
      setSalesData(data); // حفظ البيانات
    } catch (error) {
      console.error('Error al obtener los datos de ventas:', error);
    } finally {
      setLoading(false); // إنهاء التحميل
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
          numColumns={2} // عرض عنصرين في كل صف
          columnWrapperStyle={styles.row} // نمط الصف
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
        onPress={() => navigation.navigate('Venta')} // التنقل إلى صفحة "Venta"
      >
        <Image source={addIcon} style={styles.addIcon} />  {/* استخدام الأيقونة هنا */}
      </TouchableOpacity>
    </View>
  );
};


  

export default TiendaScreen;
