import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, ActivityIndicator, Alert } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../components/firebase';
import { useRoute } from '@react-navigation/native';
import styles from '../components/styles';

const PercentageScreen = () => {
  const { logId } = useRoute().params;
  const [loading, setLoading] = useState(true);
  const [logData, setLogData] = useState(null);
  const [hatchPercentage, setHatchPercentage] = useState(0);
  const [remainingEggPercentage, setRemainingEggPercentage] = useState(0);

  useEffect(() => {
    const fetchLogData = async () => {
      try {
        const docRef = doc(db, 'NuevaEcl', logId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setLogData(data);

          // Calcul de la proportion des œufs restants et des œufs éclos
          const eggPrimerdia = data.eggPrimerdia; // œufs au premier jour
          const eggCounts = data.eggCount || {}; // œufs restants par jour

          // Trouver le dernier nombre d'œufs enregistré
          const eggCountValues = Object.values(eggCounts);
          const lastEggCount = eggCountValues.length > 0 ? eggCountValues[eggCountValues.length - 1] : 0; // Dernier nombre d'œufs, sinon 0

          if (eggPrimerdia && lastEggCount) {
            // Calcul du pourcentage des œufs restants
            const remainingEggPercentage = (lastEggCount / eggPrimerdia) * 100;
            setRemainingEggPercentage(remainingEggPercentage); // Assurez-vous que c'est un nombre

            // Calcul du pourcentage des œufs éclos
            const hatchPercentage = ((eggPrimerdia - lastEggCount) / eggPrimerdia) * 100;
            setHatchPercentage(hatchPercentage); // Assurez-vous que c'est un nombre
          }

        } else {
          Alert.alert('Error', 'Registro no encontrado.');
        }
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al cargar los datos.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogData();
  }, [logId]);

  const barLabels = Object.keys(logData?.eggCount || {});
  const barData = {
    labels: barLabels,
    datasets: [{ data: Object.values(logData?.eggCount || {}) }],
  };

  // Données pour le graphique circulaire
  const pieData = [
    {
      name: "Hatch Percentage",
      population: hatchPercentage,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Remaining Eggs",
      population: remainingEggPercentage,
      color: "blue",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    }
  ];

  const screenWidth = Dimensions.get('window').width;
  const chartConfig = {
    backgroundGradientFrom: '#F6F8FB',
    backgroundGradientTo: '#F6F8FB',
    color: () => `hsl(266, 91.60%, 46.50%)`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007ACC" />
      ) : (
        <>
          <Text style={styles.title}>Tipo: {logData?.type}</Text>
          <Text style={styles.title}>{new Date(logData?.incubationDate).toLocaleDateString()}</Text>
          

          {/* Graphique circulaire */}
          <PieChart
            data={pieData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />

          {/* Graphique à barres */}
          <BarChart
            data={barData}
            width={screenWidth - 40}
            height={220}
            chartConfig={chartConfig}
            verticalLabelRotation={30}
          />
        </>
      )}
    </View>
  );
};

export default PercentageScreen;
