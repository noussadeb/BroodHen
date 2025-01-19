import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../components/firebase'; 
import { useNavigation } from '@react-navigation/native'; 
import styles from '../components/styles';




type HatchLog = {
  id: string;
  type: string;
  incubationDate: string;
  extendHatch: boolean;
  createdAt: string;
};

function ArchivosScreen() {
  const [logs, setLogs] = useState<HatchLog[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); 

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'NuevaEcl'),
      (snapshot) => {
        const fetchedLogs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as HatchLog[];
        setLogs(fetchedLogs);
        setLoading(false);
      },
      (error) => {
        Alert.alert('Error', 'No se pudieron obtener los datos.');
        console.error('Error al obtener los datos:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLogPress = (logId: string) => {
   
    navigation.navigate('Percentage', { logId });
  };

  const renderLogItem = ({ item }: { item: HatchLog }) => (
    <TouchableOpacity style={styles.logItem} onPress={() => handleLogPress(item.id)}>
      <Text style={styles.title}>
        {item.type} - {new Date(item.createdAt).toLocaleDateString()}
      </Text>
      <Text style={styles.detail}>
        Día de incubación: {new Date(item.incubationDate).toLocaleDateString()}
      </Text>
      <Text style={styles.detail}>
        Extender la eclosión: {item.extendHatch ? 'Sí' : 'No'}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007ACC" />
        <Text style={styles.loadingText}>Cargando registros...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
     
      <Text style={styles.header}>Registros de Incubaciones</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={renderLogItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay registros disponibles.</Text>}
      />
    </View>
  );
}


export default ArchivosScreen;
