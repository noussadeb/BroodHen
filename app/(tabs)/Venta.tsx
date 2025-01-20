import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../components/firebase';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import styles from '../components/styles';
import { useNavigation } from '@react-navigation/native';


const VentaScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    ubicacion: '',
    tipo: '',
    edad: '',
    numero: '',
    comentario: '',
    precioCompleto: '',
    imagenes: '',
  });
  const [imageUri, setImageUri] = useState(null);

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant permission to access the media library');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.Photo,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const saveDataToFirestore = async () => {
    try {
      if (!formData.ubicacion || !formData.tipo || !formData.precioCompleto) {
        Alert.alert('Error', 'Por favor, complete todos los campos obligatorios.');
        return;
      }
  
      const docRef = await addDoc(collection(db, 'Tienda'), {
        ubicacion: formData.ubicacion,
        tipo: formData.tipo,
        edad: parseInt(formData.edad) || 0,
        numero: parseInt(formData.numero) || 0,
        comentario: formData.comentario,
        precioCompleto: parseFloat(formData.precioCompleto) || 0,
        fechaRegistro: new Date().toISOString(),
        imagenes: '', 
      });
  
      if (imageUri) {
       
        const response = await fetch(imageUri);
        const blob = await response.blob();
  
        
        const imageRef = ref(storage, `images/${docRef.id}.jpg`); 
        await uploadBytes(imageRef, blob);
  
       
        const imageUrl = await getDownloadURL(imageRef);
  
        
        const docUpdateRef = doc(db, 'Tienda', docRef.id);
        await updateDoc(docUpdateRef, {
          imagenes: imageUrl,
        });
      }
  
      Alert.alert('Éxito', 'Los datos se han guardado correctamente.');
      setFormData({
        ubicacion: '',
        tipo: '',
        edad: '',
        numero: '',
        comentario: '',
        precioCompleto: '',
        imagenes: '',
      });
      setImageUri(null);
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      Alert.alert('Error', 'No se pudieron guardar los datos. Inténtalo de nuevo.');
    }
  };
  

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Agregar pájaros</Text>

      <TextInput
        style={styles.input}
        placeholder="Ubicación"
        value={formData.ubicacion}
        onChangeText={(value) => handleInputChange('ubicacion', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={formData.tipo}
        onChangeText={(value) => handleInputChange('tipo', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="La edad"
        keyboardType="numeric"
        value={formData.edad}
        onChangeText={(value) => handleInputChange('edad', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        keyboardType="numeric"
        value={formData.numero}
        onChangeText={(value) => handleInputChange('numero', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Comentario"
        multiline
        value={formData.comentario}
        onChangeText={(value) => handleInputChange('comentario', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio completo"
        keyboardType="numeric"
        value={formData.precioCompleto}
        onChangeText={(value) => handleInputChange('precioCompleto', value)}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadText}>Descargar fotos</Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      <View style={styles.buttonContainer}>
        
        <TouchableOpacity style={styles.saveButton} onPress={saveDataToFirestore}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VentaScreen;
