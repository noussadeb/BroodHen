import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();

 
  const handleLogout = () => {
    console.log('Cerrar sesión');
  };


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

 
  const backgroundColor = isDarkMode ? '#333' : '#f4f4f4';
  const textColor = isDarkMode ? '#fff' : '#333';

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <Text style={[styles.header, { color: textColor }]}>Ajustes</Text>

      
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Perfil')}>
        <View style={styles.optionContent}>
          <IconButton icon="account" size={24} color="#007BFF" />
          <Text style={[styles.optionText, { color: textColor }]}>Datos de perfil</Text>
        </View>
      </TouchableOpacity>

     
      <TouchableOpacity
        style={styles.option}
        onPress={() => console.log('Abrir Notificaciones')}>
        <View style={styles.optionContent}>
          <IconButton icon="bell" size={24} color="#007BFF" />
          <Text style={[styles.optionText, { color: textColor }]}>Notificaciones</Text>
        </View>
        </TouchableOpacity>

     
      <TouchableOpacity
        style={styles.option}
        onPress={() => console.log('Cambiar idioma')}>
        <View style={styles.optionContent}>
          <IconButton icon="language" size={24} color="#007BFF" />
          <Text style={[styles.optionText, { color: textColor }]}>Idioma</Text>
        </View>
      </TouchableOpacity>

      
      <TouchableOpacity
        style={styles.option}
        onPress={toggleDarkMode}>
        <View style={styles.optionContent}>
          <IconButton icon="theme-light-dark" size={24} color="#007BFF" />
          <Text style={[styles.optionText, { color: textColor }]}>
            {isDarkMode ? 'Modo claro' : 'Modo oscuro'}
          </Text>
        </View>
      </TouchableOpacity>

     
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}>
        <View style={styles.optionContent}>
          <IconButton icon="logout" size={24} color="#fff" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  option: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#ccc',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    marginLeft: 15,
  },
  logoutButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    shadowColor: '#ccc',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  logoutText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 15,
  },
});

export default SettingsScreen;
