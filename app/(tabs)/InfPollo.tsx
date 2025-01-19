import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../components/styles';
import Header from '../components/Header';

// بيانات أنواع الدجاج
const birds = [
  { name: 'Pavo Real', image: require('../../assets/images/Pavo_Real.jpg'), info: 'معلومات عن Pavo Real: معلومات عن الدجاج ذو الريش الجميل ...' },
  { name: 'Pollo sedosos', image: require('../../assets/images/pol_sel.jpg'), info: 'معلومات عن Pollo sedosos: الدجاج ذو الريش الحريري الذي يتميز بجسمه السمين وريشه الناعم ...' },
  { name: 'Pollo sussex moteado', image: require('../../assets/images/sussex_moteado.jpg'), info: 'معلومات عن Pollo sussex moteado: الدجاج ذو الريش الملون والمميز ...' },
];

const InfPolloScreen = () => {
  // تعيين حالة الدجاج المختار
  const [selectedBird, setSelectedBird] = useState(birds[0]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* عرض صورة الدجاج المختار */}
      <Image source={selectedBird.image} style={styles.imageInf} />
      <Text style={styles.title}>{selectedBird.name}</Text>
      <Text style={styles.info}>{selectedBird.info}</Text>

      {/* عرض الأزرار لاختيار نوع دجاج */}
      <View style={styles.buttonsContainer}>
        {birds.map((bird, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => setSelectedBird(bird)} // تغيير نوع الدجاج عند الضغط على الزر
          >
            <Text style={styles.buttonText}>{bird.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};



export default InfPolloScreen;
