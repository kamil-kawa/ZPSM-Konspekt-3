import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  SafeAreaView,
} from 'react-native';
// Krok 1: Importujemy silnik mathjs
import { evaluate } from 'mathjs';

type ButtonType = 'number' | 'operator' | 'utility';

export default function SimpleCalculator() {
  // Krok 2: Zmieniamy stany. Potrzebujemy tylko jednego.
  const [expression, setExpression] = useState('');

  // --- Nowa Logika ---

  // Dodaje cyfrę lub przecinek do wyrażenia
  const handleInput = (input: string) => {
    // mathjs używa kropki, nie przecinka
    const value = input === ',' ? '.' : input;
    setExpression(expression + value);
  };

  // Dodaje operator do wyrażenia
  const handleOperator = (op: string) => {
    // Zamieniamy symbole UI na symbole matematyczne
    let mathOp = op;
    if (op === '×') mathOp = '*';
    if (op === '÷') mathOp = '/';
    if (op === '−') mathOp = '-';
    
    setExpression(expression + mathOp);
  };

  // Czyści wszystko
  const handleClear = () => {
    setExpression('');
  };

  // Najważniejsza zmiana: oblicza całe wyrażenie
  const handleEquals = () => {
    try {
      // Używamy 'evaluate' z mathjs do obliczenia stringa
      const result = evaluate(expression);
      setExpression(result.toString().replace('.', ','));
    } catch (e) {
      setExpression('Błąd');
    }
  };

  // --- Reszta bez zmian ---

  const renderButton = (
    text: string,
    type: ButtonType,
    onPress: () => void,
    flexSize: number = 1,
    extraButtonStyles: ViewStyle = {},
  ) => {
    const buttonStyles: ViewStyle[] = [styles.button];
    const textStyles: TextStyle[] = [styles.buttonText];
    if (type === 'number') buttonStyles.push(styles.buttonDarkGray);
    else if (type === 'operator') buttonStyles.push(styles.buttonOrange);
    else if (type === 'utility') buttonStyles.push(styles.buttonLightGray);
    buttonStyles.push({flex: flexSize});
    buttonStyles.push(extraButtonStyles);
    return (
      <TouchableOpacity
        style={buttonStyles}
        onPress={onPress}
        disabled={text === ''}>
        <Text style={textStyles}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.displayContainer}>
        {/* Krok 3: Wyświetlacz pokazuje 'expression' (lub 0)
            Zamieniamy znaki z powrotem na przyjazne UI */}
        <Text style={styles.displayText}>
          {expression.replace(/\./g, ',').replace(/\*/g, '×').replace(/\//g, '÷') || '0'}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        {/* Krok 4: Podpinamy nowe funkcje */}
        <View style={styles.row}>
          {renderButton('AC', 'utility', handleClear, 1)}
          {renderButton('', 'utility', () => {}, 2)}
          {renderButton('÷', 'operator', () => handleOperator('÷'), 1)}
        </View>
        <View style={styles.row}>
          {renderButton('7', 'number', () => handleInput('7'), 1)}
          {renderButton('8', 'number', () => handleInput('8'), 1)}
          {renderButton('9', 'number', () => handleInput('9'), 1)}
          {renderButton('×', 'operator', () => handleOperator('×'), 1)}
        </View>
        <View style={styles.row}>
          {renderButton('4', 'number', () => handleInput('4'), 1)}
          {renderButton('5', 'number', () => handleInput('5'), 1)}
          {renderButton('6', 'number', () => handleInput('6'), 1)}
          {renderButton('−', 'operator', () => handleOperator('-'), 1)}
        </View>
        <View style={styles.row}>
          {renderButton('1', 'number', () => handleInput('1'), 1)}
          {renderButton('2', 'number', () => handleInput('2'), 1)}
          {renderButton('3', 'number', () => handleInput('3'), 1)}
          {renderButton('+', 'operator', () => handleOperator('+'), 1)}
        </View>
        <View style={styles.row}>
          {renderButton('0', 'number', () => handleInput('0'), 2)}
          {renderButton(',', 'number', () => handleInput(','), 1)}
          {renderButton('=', 'operator', handleEquals, 1)}
        </View>
      </View>
    </SafeAreaView>
  );
}

// === Style (bez zmian) ===
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
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    margin: 0.5,
  },
  buttonText: {
    fontSize: 40,
    color: 'white',
  },
  buttonDarkGray: {
    backgroundColor: '#7c7d7d',
  },
  buttonLightGray: {
    backgroundColor: '#646464',
  },
  buttonOrange: {
    backgroundColor: '#f0a03b',
  },
});