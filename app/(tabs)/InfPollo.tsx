import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from '../components/styles';

const InfPolloScreen = () => {
  const route = useRoute();
  const { name, info, image } = route.params || {}; // الحصول على البيانات الممررة

  if (!name || !info || !image) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>لا توجد معلومات متوفرة.</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerLog}>
      <Image source={image} style={styles.imageP} />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
};



export default InfPolloScreen;
