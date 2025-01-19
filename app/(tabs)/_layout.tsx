import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)/Login" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)/Home" />
      <Stack.Screen name="(tabs)/Signup" />
      <Stack.Screen name="(tabs)/Venta" />
      <Stack.Screen name="(tabs)/Informacion" />
      <Stack.Screen name="(tabs)/InfPollo" />
      <Stack.Screen name="(tabs)/Tienda" />
      <Stack.Screen name="(tabs)/HatchPercentage" />
      <Stack.Screen name="(tabs)/Ajustes" />
      
      <Stack.Screen name="NotFoundScreen" options={{ title: 'Page Not Found' }} />

    </Stack>
  );
}
