import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

// W projektach Expo Router, główny komponent jest domyślnym eksportem
export default function TabOneScreen() {
  // Stan kontrolujący, czy tekst jest widoczny
  const [isTextVisible, setIsTextVisible] = useState(false);

  // Funkcja przełączająca stan widoczności
  const toggleVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  // Używamy <View> zamiast <SafeAreaView>, 
  // ponieważ layout jest już zarządzany przez nadrzędny _layout.tsx
  return (
    <View style={styles.container}>
      {/* Tytuł zadania */}
      <Text style={styles.title}>Zadanie 2</Text>

      {/* Przycisk */}
      <TouchableOpacity style={styles.button} onPress={toggleVisibility}>
        {/* Dynamiczny tekst przycisku */}
        <Text style={styles.buttonText}>
          {isTextVisible ? 'Ukryj' : 'Pokaż'}
        </Text>
      </TouchableOpacity>

      {/* Warunkowe renderowanie tekstu z imieniem i nazwiskiem */}
      {isTextVisible && (
        <View style={styles.nameContainer}>
          <Text style={styles.nameLabel}>Nazywam się</Text>
          <Text style={styles.nameText}>Kamil Kawa</Text>
          {/* Zmień na swoje Imię i Nazwisko */}
        </View>
      )}
    </View>
  );
};

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Wyśrodkuj wszystko w pionie
    alignItems: 'center', // Wyśrodkuj wszystko w poziomie
    backgroundColor: '#f4f4f8', // Jasne tło
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, // Odstęp pod tytułem
    color: '#333',
  },
  button: {
    backgroundColor: '#e0e0e0', // Kolor tła przycisku (szary)
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  buttonText: {
    color: '#333',
    fontSize: 16,
  },
  nameContainer: {
    marginTop: 20, // Odstęp nad tekstem
    alignItems: 'center', // Wyśrodkuj tekst wewnątrz kontenera
  },
  nameLabel: {
    fontSize: 16,
    color: '#555',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});