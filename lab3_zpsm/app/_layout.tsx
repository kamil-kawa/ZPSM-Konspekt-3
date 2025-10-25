import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Konfigurujemy tylko nasz główny ekran (app/index.tsx).
        Mówimy mu, aby nie pokazywał górnego paska (header).
      */}
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false 
        }} 
      />
      
      {/* Nie musimy tu nic dodawać dla SimpleCalculator ani ScientificCalculator,
        ponieważ nie są to osobne ekrany.
      */}
    </Stack>
  );
}