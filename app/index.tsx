// Plik: app/(tabs)/index.tsx (POPRAWIONA, PROSTA WERSJA)

import React from 'react';
import { useWindowDimensions } from 'react-native';

// Importujemy nasze dwa kalkulatory
import SimpleCalculator from './SimpleCalculator';
import ScientificCalculator from './ScientificCalculator';

export default function MainCalculatorScreen() {
  // 1. Wykrywamy wymiary ekranu na żywo
  const { width, height } = useWindowDimensions();

  // 2. Sprawdzamy, czy jest poziomo
  const isHorizontal = width > height;

  // 3. Zwracamy komponent BEZPOŚREDNIO, bez żadnego opakowania <View>
  //    Nasze komponenty kalkulatorów mają już własne, główne <View style={{flex: 1}}>
  if (isHorizontal) {
    return <ScientificCalculator />;
  }

  // Domyślnie zwracamy pionowy
  return <SimpleCalculator />;
}

// NIE POTRZEBUJEMY TUTAJ JUŻ ŻADNYCH STYLÓW