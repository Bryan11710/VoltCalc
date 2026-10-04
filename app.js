import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import NativeComponentScreen from './components/NativeComponentScreen';

export default function App() {
  const [tipoCalculo, setTipoCalculo] = useState('corriente');
  const [valorA, setValorA] = useState('');
  const [valorB, setValorB] = useState('');
  const [resultado, setResultado] = useState(null);

  const handleCalcular = () => {
    const numA = parseFloat(valorA);
    const numB = parseFloat(valorB);

    if (isNaN(numA) || (tipoCalculo !== 'potencia' && isNaN(numB) && tipoCalculo !== 'corriente')) {
      return;
    }

    let res = 0;
    let unidad = '';

    switch (tipoCalculo) {
      case 'corriente':
        if (numB === 0) {
          Alert.alert('Error', 'La resistencia no puede ser cero.');
          return;
        }
        res = numA / numB;
        unidad = 'Amperios (A)';
        break;
      case 'voltaje':
        res = numA * numB;
        unidad = 'Voltios (V)';
        break;
      case 'resistencia':
        if (numB === 0) {
          Alert.alert('Error', 'La corriente no puede ser cero.');
          return;
        }
        res = numA / numB;
        unidad = 'Ohmios (Ω)';
        break;
      case 'potencia':
        res = numA * numB;
        unidad = 'Vatios (W)';
        break;
      default:
        break;
    }

    setResultado(`${res.toFixed(2)} ${unidad}`);
    Alert.alert('Cálculo Exitoso', `Resultado: ${res.toFixed(2)} ${unidad}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>VoltCalc Mobile</Text>
      <Text style={styles.subtitle}>Ingeniería en Tecnologías de la Información - UEA</Text>

      {/* Módulo de Cálculo Eléctrico */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Módulo de Cálculo de Física / Electricidad</Text>
        
        <Text style={styles.labelMenu}>Seleccione la magnitud a calcular:</Text>
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={[styles.menuButton, tipoCalculo === 'corriente' && styles.menuButtonActive]} 
            onPress={() => { setTipoCalculo('corriente'); setResultado(null); setValorA(''); setValorB(''); }}
          >
            <Text style={[styles.menuButtonText, tipoCalculo === 'corriente' && styles.menuButtonTextActive]}>Corriente (I)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuButton, tipoCalculo === 'voltaje' && styles.menuButtonActive]} 
            onPress={() => { setTipoCalculo('voltaje'); setResultado(null); setValorA(''); setValorB(''); }}
          >
            <Text style={[styles.menuButtonText, tipoCalculo === 'voltaje' && styles.menuButtonTextActive]}>Voltaje (V)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuButton, tipoCalculo === 'resistencia' && styles.menuButtonActive]} 
            onPress={() => { setTipoCalculo('resistencia'); setResultado(null); setValorA(''); setValorB(''); }}
          >
            <Text style={[styles.menuButtonText, tipoCalculo === 'resistencia' && styles.menuButtonTextActive]}>Resistencia (R)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuButton, tipoCalculo === 'potencia' && styles.menuButtonActive]} 
            onPress={() => { setTipoCalculo('potencia'); setResultado(null); setValorA(''); setValorB(''); }}
          >
            <Text style={[styles.menuButtonText, tipoCalculo === 'potencia' && styles.menuButtonTextActive]}>Potencia (P)</Text>
          </TouchableOpacity>
        </View>

        {tipoCalculo === 'corriente' && (
          <>
            <Text style={styles.formulaText}>Fórmula: I = V / R</Text>
            <TextInput style={styles.input} placeholder="Ingrese Voltaje (V)" placeholderTextColor="#888" keyboardType="numeric" value={valorA} onChangeText={setValorA} />
            <TextInput style={styles.input} placeholder="Ingrese Resistencia (Ω)" placeholderTextColor="#888" keyboardType="numeric" value={valorB} onChangeText={setValorB} />
          </>
        )}

        {tipoCalculo === 'voltaje' && (
          <>
            <Text style={styles.formulaText}>Fórmula: V = I × R</Text>
            <TextInput style={styles.input} placeholder="Ingrese Corriente (A)" placeholderTextColor="#888" keyboardType="numeric" value={valorA} onChangeText={setValorA} />
            <TextInput style={styles.input} placeholder="Ingrese Resistencia (Ω)" placeholderTextColor="#888" keyboardType="numeric" value={valorB} onChangeText={setValorB} />
          </>
        )}

        {tipoCalculo === 'resistencia' && (
          <>
            <Text style={styles.formulaText}>Fórmula: R = V / I</Text>
            <TextInput style={styles.input} placeholder="Ingrese Voltaje (V)" placeholderTextColor="#888" keyboardType="numeric" value={valorA} onChangeText={setValorA} />
            <TextInput style={styles.input} placeholder="Ingrese Corriente (A)" placeholderTextColor="#888" keyboardType="numeric" value={valorB} onChangeText={setValorB} />
          </>
        )}

        {tipoCalculo === 'potencia' && (
          <>
            <Text style={styles.formulaText}>Fórmula: P = V × I</Text>
            <TextInput style={styles.input} placeholder="Ingrese Voltaje (V)" placeholderTextColor="#888" keyboardType="numeric" value={valorA} onChangeText={setValorA} />
            <TextInput style={styles.input} placeholder="Ingrese Corriente (A)" placeholderTextColor="#888" keyboardType="numeric" value={valorB} onChangeText={setValorB} />
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleCalcular}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>

        {resultado && (
          <Text style={styles.resultText}>Resultado: {resultado}</Text>
        )}
      </View>

      {/* Módulo de Registro de Campo */}
      <View style={styles.nativeWrapper}>
        <NativeComponentScreen />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#9370DB', // Morado claro/destacado
    marginTop: 25,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4B0082', // Morado oscuro (Indigo)
    shadowColor: '#4B0082',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  labelMenu: {
    color: '#BA55D3',
    fontSize: 13,
    marginBottom: 8,
    fontWeight: '500',
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  menuButton: {
    width: '48%',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4B0082',
    marginBottom: 8,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  menuButtonActive: {
    backgroundColor: '#4B0082',
  },
  menuButtonText: {
    color: '#BA55D3',
    fontSize: 12,
    fontWeight: '600',
  },
  menuButtonTextActive: {
    color: '#FFFFFF',
  },
  formulaText: {
    color: '#aaa',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#000000',
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#4B0082',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  resultText: {
    marginTop: 14,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#BA55D3',
  },
  nativeWrapper: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#4B0082',
  }
});