import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type ButtonType = 'number' | 'operator' | 'utility' | 'scientific';

interface CalculatorButtonProps {
  text: string;
  onPress: () => void;
  type: ButtonType;
  flexSize?: number;
  textSize: 'simple' | 'scientific';
  // Usunęliśmy 'extraStyles' z interfejsu
}

const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  text,
  onPress,
  type,
  flexSize = 1,
  textSize,
}) => {
  
  const buttonStyles: ViewStyle[] = [styles.button];
  const textStyles: TextStyle[] = [
    textSize === 'simple' ? styles.textSimple : styles.textScientific
  ];

  let specificTextStyle: TextStyle = styles.textLight;

  switch (type) {
    case 'number':
      buttonStyles.push(styles.buttonDarkGray);
      specificTextStyle = styles.textLight;
      break;
    case 'operator':
      buttonStyles.push(styles.buttonOrange);
      specificTextStyle = styles.textLight;
      break;
    case 'utility':
      if (textSize === 'simple') {
        buttonStyles.push(styles.buttonLightGray); 
      } else {
        buttonStyles.push(styles.buttonScientific); 
      }
      specificTextStyle = styles.textLight;
      break;
    case 'scientific':
      buttonStyles.push(styles.buttonScientific);
      specificTextStyle = styles.textLight;
      break;
  }
  
  textStyles.push(specificTextStyle);
  buttonStyles.push({ flex: flexSize });

  // === BŁĘDNA LOGIKA DLA '0' ZOSTAŁA STĄD USUNIĘTA ===

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={text === ''}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

// Style
const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
  },
  textSimple: { fontSize: 40 },
  textScientific: { fontSize: 24 },
  textLight: { color: 'white' },
  textDark: { color: 'black' },
  buttonDarkGray: { backgroundColor: '#7c7d7d' },
  buttonLightGray: { backgroundColor: '#646464' },
  buttonOrange: { backgroundColor: '#f0a03b' },
  buttonScientific: { backgroundColor: '#555a55' },
});

export default CalculatorButton;