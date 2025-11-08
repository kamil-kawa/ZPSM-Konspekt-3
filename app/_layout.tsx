import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

// To powoduje, że natywny splash screen pozostaje widoczny, 
// dopóki nie ukryjemy go ręcznie.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  
  useEffect(() => {
    // Ukryj splash screen, gdy tylko ten layout się zamontuje
    // (czyli gdy aplikacja jest gotowa do wyświetlenia)
    SplashScreen.hideAsync();
  }, []); // Uruchom tylko raz

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