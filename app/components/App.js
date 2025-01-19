import React, { useState, useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../(tabs)/Login';
import SignupScreen from '../(tabs)/Signup';
import MainScreen from '../(tabs)/Home'; // تأكد من أنك قد أنشأت الشاشة الرئيسية
import VentaScreen from '../(tabs)/Venta';
import InformacionScreen from '../(tabs)/Informacion';
import TiendaScreen from '../(tabs)/Tienda';
import PercentageScreen from '../(tabs)/Percentage';
import { ThemeProvider } from '../components/ThemeContext';
import SettingsScreen from '../(tabs)/Ajustes';
import ArchivosScreen from '../(tabs)/Archivos';
import InfPolloScreen from '../(tabs)/InfPollo';



const Stack = createStackNavigator();

function App() {
  const { colors } = useTheme(); 
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background, 
            },
            headerTintColor: colors.text, 
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={MainScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Venta" component={VentaScreen} />
          <Stack.Screen name="Informacion" component={InformacionScreen} />
          <Stack.Screen name="InfPollo" component={DetailsScreen} />
          <Stack.Screen name="Tienda" component={TiendaScreen} />
          <Stack.Screen name="HatchPercentage" component={HatchPercentageScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Archivos" component={ArchivosScreen} />
          <Stack.Screen name="Percentage" component={PercentageScreen} />
          <Stack.Screen name="InfPollo" component={InfPolloScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
