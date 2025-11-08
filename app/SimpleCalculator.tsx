// Plik: app/SimpleCalculator.tsx (POPRAWIONY)

import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CalculatorButton from '../components/CalculatorButton'; // Poprawny import

// Definiujemy typ obiektu przycisku
interface ButtonConfig {
  text: string;
  type: 'number' | 'operator' | 'utility';
  flexSize?: number;
  onPress: () => void;
  // Usunęliśmy 'extraStyles' stąd
}

export default function SimpleCalculator() {
  const [expression, setExpression] = useState('');

  // --- Logika (bez zmian) ---
  const handlePress = (value: string) => setExpression(expression + value);
  const handleClear = () => setExpression('');
  const handleEquals = () => {
    try {
      const mathExpression = expression
        .replace(/,/g, '.')
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-');
      const result = evaluate(mathExpression);
      setExpression(result.toString().replace('.', ','));
    } catch (e) {
      setExpression('Błąd');
    }
  };

  // --- Paleta Przycisków (bez 'extraStyles') ---
  const buttonRows: ButtonConfig[][] = [
    [
      { text: 'AC', type: 'utility', flexSize: 1, onPress: handleClear },
      { text: '', type: 'utility', flexSize: 2, onPress: () => {} },
      { text: '÷', type: 'operator', flexSize: 1, onPress: () => handlePress('/') },
    ],
    [
      { text: '7', type: 'number', flexSize: 1, onPress: () => handlePress('7') },
      { text: '8', type: 'number', flexSize: 1, onPress: () => handlePress('8') },
      { text: '9', type: 'number', flexSize: 1, onPress: () => handlePress('9') },
      { text: '×', type: 'operator', flexSize: 1, onPress: () => handlePress('*') },
    ],
    [
      { text: '4', type: 'number', flexSize: 1, onPress: () => handlePress('4') },
      { text: '5', type: 'number', flexSize: 1, onPress: () => handlePress('5') },
      { text: '6', type: 'number', flexSize: 1, onPress: () => handlePress('6') },
      { text: '−', type: 'operator', flexSize: 1, onPress: () => handlePress('-') },
    ],
    [
      { text: '1', type: 'number', flexSize: 1, onPress: () => handlePress('1') },
      { text: '2', type: 'number', flexSize: 1, onPress: () => handlePress('2') },
      { text: '3', type: 'number', flexSize: 1, onPress: () => handlePress('3') },
      { text: '+', type: 'operator', flexSize: 1, onPress: () => handlePress('+') },
    ],
    [
      { text: '0', type: 'number', flexSize: 2, onPress: () => handlePress('0') },
      { text: ',', type: 'number', flexSize: 1, onPress: () => handlePress('.') },
      { text: '=', type: 'operator', flexSize: 1, onPress: handleEquals },
    ],
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>
          {expression.replace(/\./g, ',').replace(/\*/g, '×').replace(/\//g, '÷') || '0'}
        </Text>
      </View>

      {/* --- Budowanie widoku (bez 'extraStyles') --- */}
      <View style={styles.buttonsContainer}>
        {buttonRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button, buttonIndex) => (
              <CalculatorButton
                key={buttonIndex}
                text={button.text}
                type={button.type}
                flexSize={button.flexSize}
                onPress={button.onPress}
                textSize='simple'
              />
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

// --- Style (bez zmian) ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#505055',
  },
  displayContainer: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  displayText: {
    color: 'white',
    fontSize: 80,
    fontWeight: '300',
  },
  buttonsContainer: {
    flex: 0.7,
    rowGap: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 1,
  },
});