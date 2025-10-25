import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Dimensions, // Importujemy 'Dimensions'
} from 'react-native';

// Pobieramy wysokość ekranu
const {height: SCREEN_HEIGHT} = Dimensions.get('window');

// Typy dla przycisków
type ButtonType = 'number' | 'operator' | 'utility';

export default function CalculatorScreen() {
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [firstValue, setFirstValue] = useState('');

  // Obsługa wprowadzania cyfr i PRZECINKA
  const handleInput = (input: string) => {
    if (input === ',') {
      if (!displayValue.includes(',')) {
        setDisplayValue(displayValue + ',');
      }
    } else {
      if (displayValue === '0') {
        setDisplayValue(input);
      } else {
        setDisplayValue(displayValue + input);
      }
    }
  };

  // Obsługa operatorów (+, -, *, /)
  const handleOperator = (op: string) => {
    setFirstValue(displayValue.replace(',', '.'));
    setOperator(op);
    setDisplayValue('0');
  };

  // Przycisk "AC" (All Clear)
  const handleClear = () => {
    setDisplayValue('0');
    setOperator(null);
    setFirstValue('');
  };

  // Przycisk "="
  const handleEquals = () => {
    if (!operator || !firstValue) {
      return;
    }

    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue.replace(',', '.'));
    let result = 0;

    switch (operator) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '÷':
        result = num1 / num2;
        break;
      default:
        return;
    }

    setDisplayValue(result.toString().replace('.', ','));
    setOperator(null);
    setFirstValue('');
  };

  // Funkcja pomocnicza do renderowania przycisków
  const renderButton = (
    text: string,
    type: ButtonType,
    onPress: () => void,
    flexSize: number = 1,
    extraButtonStyles: ViewStyle = {},
  ) => {
    const buttonStyles: ViewStyle[] = [styles.button];
    const textStyles: TextStyle[] = [styles.buttonText];

    if (type === 'number') {
      buttonStyles.push(styles.buttonDarkGray);
    } else if (type === 'operator') {
      buttonStyles.push(styles.buttonOrange);
    } else if (type === 'utility') {
      buttonStyles.push(styles.buttonLightGray);
    }

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
    <View style={styles.container}>
      {/* 1. Ekran Wyświetlacza */}
      <View style={styles.displayContainer}>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>

      {/* 2. Panel Przycisków */}
      <View style={styles.buttonsContainer}>
        {/* Wiersz 1 */}
        <View style={styles.row}>
          {renderButton('AC', 'utility', handleClear, 1)}
          {renderButton('', 'utility', () => {}, 2)}
          {renderButton('÷', 'operator', () => handleOperator('÷'), 1)}
        </View>

        {/* Wiersz 2 */}
        <View style={styles.row}>
          {renderButton('7', 'number', () => handleInput('7'), 1)}
          {renderButton('8', 'number', () => handleInput('8'), 1)}
          {renderButton('9', 'number', () => handleInput('9'), 1)}
          {renderButton('×', 'operator', () => handleOperator('*'), 1)}
        </View>

        {/* Wiersz 3 */}
        <View style={styles.row}>
          {renderButton('4', 'number', () => handleInput('4'), 1)}
          {renderButton('5', 'number', () => handleInput('5'), 1)}
          {renderButton('6', 'number', () => handleInput('6'), 1)}
          {renderButton('−', 'operator', () => handleOperator('-'), 1)}
        </View>

        {/* Wiersz 4 */}
        <View style={styles.row}>
          {renderButton('1', 'number', () => handleInput('1'), 1)}
          {renderButton('2', 'number', () => handleInput('2'), 1)}
          {renderButton('3', 'number', () => handleInput('3'), 1)}
          {renderButton('+', 'operator', () => handleOperator('+'), 1)}
        </View>

        {/* Wiersz 5 */}
        <View style={styles.row}>
          {renderButton(
            '0',
            'number',
            () => handleInput('0'),
            2, // flexSize
            {alignItems: 'flex-start', paddingLeft: 30}, // extraButtonStyles
          )}
          {renderButton(',', 'number', () => handleInput(','), 1)}
          {renderButton('=', 'operator', handleEquals, 1)}
        </View>
      </View>
    </View>
  );
}

// === STYLOWANIE Z OSTATECZNĄ POPRAWKĄ FLEXBOXA ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#505055', // Tło całości, widoczne w odstępach
  },
  displayContainer: {
    // Poprawka: Zamiast 'flex: 0.3', ustalamy wysokość na 30% ekranu
    height: SCREEN_HEIGHT * 0.3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#505055', // Tło wyniku
  },
  displayText: {
    color: 'white',
    fontSize: 80,
    fontWeight: '300',
  },
  buttonsContainer: {
    // Poprawka: Zamiast 'flex: 0.7', 'flex: 1' wypełni resztę ekranu
    flex: 1,
    rowGap: 1, // Odstęp 1px między wierszami
  },
  row: {
    flex: 1, // Każdy wiersz zajmie 1/5 dostępnej przestrzeni w 'buttonsContainer'
    flexDirection: 'row',
    columnGap: 1, // Odstęp 1px między przyciskami
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  // Style tekstu
  buttonText: {
    fontSize: 40,
    color: 'white',
  },
  // Style tła przycisków
  buttonDarkGray: { // Cyfry
    backgroundColor: '#7c7d7d',
  },
  buttonLightGray: { // AC i puste
    backgroundColor: '#646464',
  },
  buttonOrange: { // Operatory
    backgroundColor: '#f0a03b',
  },
});