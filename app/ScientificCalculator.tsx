// Plik: app/ScientificCalculator.tsx (POPRAWIONY)

import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import CalculatorButton from '../components/CalculatorButton';

type ButtonType = 'number' | 'operator' | 'utility' | 'scientific';

// Ten interfejs wymaga 'value'
interface ButtonConfig {
  text: string;
  value: string; // Wartość do wstawienia do mathjs
  type: ButtonType;
  flexSize?: number;
  onPress: (value: string) => void;
}

export default function ScientificCalculator() {
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
        .replace(/−/g, '-')
        .replace(/π/g, 'pi')
        .replace(/√/g, 'sqrt')
        .replace(/log₁₀/g, 'log10')
        .replace(/ln/g, 'log');

      const result = evaluate(mathExpression);
      setExpression(result.toString().replace('.', ','));
    } catch (e) {
      setExpression('Błąd');
    }
  };
  
  // --- POPRAWIONA PALETA PRZYCISKÓW ---
  // Dodano brakujące 'value: ""' do przycisków akcji
  const buttonRows: (Omit<ButtonConfig, 'onPress'> & { onPress: () => void; value: string })[][] = [
    // Wiersz 1
    [
      { text: '(', value: '(', type: 'scientific', onPress: () => handlePress('(') },
      { text: ')', value: ')', type: 'scientific', onPress: () => handlePress(')') },
      { text: 'mc', value: '', type: 'scientific', onPress: () => {} },
      { text: 'm+', value: '', type: 'scientific', onPress: () => {} },
      { text: 'm-', value: '', type: 'scientific', onPress: () => {} },
      { text: 'mr', value: '', type: 'scientific', onPress: () => {} },
      { text: 'AC', value: '', type: 'utility', onPress: handleClear },
      { text: '+/-', value: '(-', type: 'utility', onPress: () => handlePress('(-') },
      { text: '%', value: '/100', type: 'utility', onPress: () => handlePress('/100') },
      { text: '÷', value: '/', type: 'operator', onPress: () => handlePress('/') },
    ],
    // Wiersz 2
    [
      { text: '2ⁿᵈ', value: '', type: 'scientific', onPress: () => {} },
      { text: 'x²', value: '^2', type: 'scientific', onPress: () => handlePress('^2') },
      { text: 'x³', value: '^3', type: 'scientific', onPress: () => handlePress('^3') },
      { text: 'xʸ', value: '^', type: 'scientific', onPress: () => handlePress('^') },
      { text: 'eˣ', value: 'exp(', type: 'scientific', onPress: () => handlePress('exp(') },
      { text: '10ˣ', value: '10^', type: 'scientific', onPress: () => handlePress('10^') },
      { text: '7', value: '7', type: 'number', onPress: () => handlePress('7') },
      { text: '8', value: '8', type: 'number', onPress: () => handlePress('8') },
      { text: '9', value: '9', type: 'number', onPress: () => handlePress('9') },
      { text: '×', value: '*', type: 'operator', onPress: () => handlePress('*') },
    ],
    // Wiersz 3
    [
      { text: '¹/ₓ', value: '1/', type: 'scientific', onPress: () => handlePress('1/') },
      { text: '²√x', value: 'sqrt(', type: 'scientific', onPress: () => handlePress('sqrt(') },
      { text: '³√x', value: 'cbrt(', type: 'scientific', onPress: () => handlePress('cbrt(') },
      { text: 'ʸ√x', value: 'nthRoot(', type: 'scientific', onPress: () => handlePress('nthRoot(') },
      { text: 'ln', value: 'log(', type: 'scientific', onPress: () => handlePress('log(') },
      { text: 'log₁₀', value: 'log10(', type: 'scientific', onPress: () => handlePress('log10(') },
      { text: '4', value: '4', type: 'number', onPress: () => handlePress('4') },
      { text: '5', value: '5', type: 'number', onPress: () => handlePress('5') },
      { text: '6', value: '6', type: 'number', onPress: () => handlePress('6') },
      { text: '−', value: '-', type: 'operator', onPress: () => handlePress('-') },
    ],
    // Wiersz 4
    [
      { text: 'x!', value: '!', type: 'scientific', onPress: () => handlePress('!') },
      { text: 'sin', value: 'sin(', type: 'scientific', onPress: () => handlePress('sin(') },
      { text: 'cos', value: 'cos(', type: 'scientific', onPress: () => handlePress('cos(') },
      { text: 'tan', value: 'tan(', type: 'scientific', onPress: () => handlePress('tan(') },
      { text: 'e', value: 'e', type: 'scientific', onPress: () => handlePress('e') },
      { text: 'EE', value: '*10^', type: 'scientific', onPress: () => handlePress('*10^') },
      { text: '1', value: '1', type: 'number', onPress: () => handlePress('1') },
      { text: '2', value: '2', type: 'number', onPress: () => handlePress('2') },
      { text: '3', value: '3', type: 'number', onPress: () => handlePress('3') },
      { text: '+', value: '+', type: 'operator', onPress: () => handlePress('+') },
    ],
    // Wiersz 5
    [
      { text: 'Rad', value: '', type: 'scientific', onPress: () => {} },
      { text: 'sinh', value: 'sinh(', type: 'scientific', onPress: () => handlePress('sinh(') },
      { text: 'cosh', value: 'cosh(', type: 'scientific', onPress: () => handlePress('cosh(') },
      { text: 'tanh', value: 'tanh(', type: 'scientific', onPress: () => handlePress('tanh(') },
      { text: 'π', value: 'pi', type: 'scientific', onPress: () => handlePress('pi') },
      { text: 'Rand', value: 'random()', type: 'scientific', onPress: () => handlePress('random()') },
      { text: '0', value: '0', type: 'number', flexSize: 2, onPress: () => handlePress('0') },
      { text: ',', value: '.', type: 'number', onPress: () => handlePress('.') },
      { text: '=', value: '', type: 'operator', onPress: handleEquals },
    ],
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{expression || '0'}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {buttonRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((button, buttonIndex) => (
              <CalculatorButton
                key={buttonIndex}
                text={button.text}
                type={button.type as ButtonType}
                flexSize={button.flexSize}
                onPress={button.onPress}
                textSize='scientific'
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
    backgroundColor: '#414646',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
  },
  displayText: {
    color: 'white',
    fontSize: 60,
    fontWeight: '300',
  },
  buttonsContainer: {
    flex: 2,
    rowGap: 1,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 1,
  },
});