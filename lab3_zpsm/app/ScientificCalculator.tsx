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

type ButtonType = 'number' | 'operator' | 'utility' | 'scientific';

export default function ScientificCalculator() {
  // Krok 2: Zmieniamy stany. Potrzebujemy tylko jednego.
  const [expression, setExpression] = useState('');

  // --- Nowa Logika ---

  // 'AC' czyści wszystko
  const handleClear = () => {
    setExpression('');
  };

  // 'handlePress' dodaje tekst przycisku do wyrażenia
  const handlePress = (value: string) => {
    setExpression(expression + value);
  };

  // 'handleEquals' oblicza całe wyrażenie
  const handleEquals = () => {
    try {
      // Tłumaczymy wszystkie symbole UI na matematyczne
      const mathExpression = expression
        .replace(/,/g, '.')
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/π/g, 'pi') // mathjs rozumie 'pi'
        .replace(/e/g, 'e')   // mathjs rozumie 'e'
        .replace(/√/g, 'sqrt') // mathjs rozumie 'sqrt'
        .replace(/log₁₀/g, 'log10')
        .replace(/ln/g, 'log'); // log w mathjs to ln

      const result = evaluate(mathExpression);
      setExpression(result.toString().replace('.', ','));
    } catch (e) {
      setExpression('Błąd');
    }
  };

  // Funkcja renderująca przyciski, teraz używa 'handlePress'
  const renderButton = (
    text: string,          // Tekst na przycisku
    value: string,         // Wartość dodawana do stringa (np. 'sin(')
    type: ButtonType,
    flexSize: number = 1,
  ) => {
    const buttonStyles: ViewStyle[] = [styles.button];
    const textStyles: TextStyle[] = [styles.buttonText];

    if (type === 'number') buttonStyles.push(styles.buttonDarkGray);
    else if (type === 'operator') buttonStyles.push(styles.buttonOrange);
    else if (type === 'utility') buttonStyles.push(styles.buttonLightGray);
    else if (type === 'scientific') buttonStyles.push(styles.buttonScientific);

    buttonStyles.push({flex: flexSize});
    
    return (
      <TouchableOpacity style={buttonStyles} onPress={() => handlePress(value)}>
        <Text style={textStyles}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.displayContainer}>
        {/* Krok 3: Wyświetlacz pokazuje 'expression' (lub 0) */}
        <Text style={styles.displayText}>{expression || '0'}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {/* Krok 4: Podpinamy nowe funkcje. Przyciski dodają stringi. */}
        {/* Wiersz 1 */}
        <View style={styles.row}>
          {renderButton('(', '(', 'scientific')}
          {renderButton(')', ')', 'scientific')}
          {renderButton('mc', '', 'scientific')}
          {renderButton('m+', '', 'scientific')}
          {renderButton('m-', '', 'scientific')}
          {renderButton('mr', '', 'scientific')}
          <TouchableOpacity style={[styles.button, styles.buttonLightGray]} onPress={handleClear}>
            <Text style={styles.buttonText}>AC</Text>
          </TouchableOpacity>
          {renderButton('+/-', '(-', 'utility')}
          {renderButton('%', '/100', 'utility')}
          {renderButton('÷', '/', 'operator')}
        </View>

        {/* Wiersz 2 */}
        <View style={styles.row}>
          {renderButton('2ⁿᵈ', '', 'scientific')}
          {renderButton('x²', '^2', 'scientific')}
          {renderButton('x³', '^3', 'scientific')}
          {renderButton('xʸ', '^', 'scientific')}
          {renderButton('eˣ', 'exp(', 'scientific')}
          {renderButton('10ˣ', '10^', 'scientific')}
          {renderButton('7', '7', 'number')}
          {renderButton('8', '8', 'number')}
          {renderButton('9', '9', 'number')}
          {renderButton('×', '*', 'operator')}
        </View>

        {/* Wiersz 3 */}
        <View style={styles.row}>
          {renderButton('¹/ₓ', '1/', 'scientific')}
          {renderButton('²√x', 'sqrt(', 'scientific')}
          {renderButton('³√x', 'cbrt(', 'scientific')}
          {renderButton('ʸ√x', 'nthRoot(', 'scientific')}
          {renderButton('ln', 'log(', 'scientific')}
          {renderButton('log₁₀', 'log10(', 'scientific')}
          {renderButton('4', '4', 'number')}
          {renderButton('5', '5', 'number')}
          {renderButton('6', '6', 'number')}
          {renderButton('−', '-', 'operator')}
        </View>

        {/* Wiersz 4 */}
        <View style={styles.row}>
          {renderButton('x!', '!', 'scientific')}
          {renderButton('sin', 'sin(', 'scientific')}
          {renderButton('cos', 'cos(', 'scientific')}
          {renderButton('tan', 'tan(', 'scientific')}
          {renderButton('e', 'e', 'scientific')}
          {renderButton('EE', '*10^', 'scientific')}
          {renderButton('1', '1', 'number')}
          {renderButton('2', '2', 'number')}
          {renderButton('3', '3', 'number')}
          {renderButton('+', '+', 'operator')}
        </View>

        {/* Wiersz 5 */}
        <View style={styles.row}>
          {renderButton('Rad', '', 'scientific')}
          {renderButton('sinh', 'sinh(', 'scientific')}
          {renderButton('cosh', 'cosh(', 'scientific')}
          {renderButton('tanh', 'tanh(', 'scientific')}
          {renderButton('π', 'pi', 'scientific')}
          {renderButton('Rand', 'random()', 'scientific')}
          {renderButton('0', '0', 'number', 2)}
          {renderButton(',', '.', 'number')}
          <TouchableOpacity style={[styles.button, styles.buttonOrange]} onPress={handleEquals}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// === STYLE (zmienione kolory) ===
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
    fontSize: 24,
    color: 'white',
  },
  buttonDarkGray: {
    backgroundColor: '#7c7d7d', 
  },
  buttonLightGray: {
    backgroundColor: '#555a55',
  },
  buttonOrange: {
    backgroundColor: '#f0a03b', 
  },
  buttonScientific: {
    backgroundColor: '#555a55',
  },
});