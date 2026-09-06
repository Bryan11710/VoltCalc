import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { initDatabase, guardarCalculoLocal, obtenerCalculosLocales } from './database/offlineManager';

export default function App() {
  const [voltaje, setVoltaje] = useState('');
  const [corriente, setCorriente] = useState('');
  const [resultado, setResultado] = useState(null);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    // Inicializamos la base de datos local al arrancar
    const setupDB = async () => {
      await initDatabase();
      cargarHistorial();
    };
    setupDB();
  }, []);

  const cargarHistorial = async () => {
    const datos = await obtenerCalculosLocales();
    setHistorial(datos);
  };

  const calcularPotencia = async () => {
    const v = parseFloat(voltaje);
    const i = parseFloat(corriente);

    if (isNaN(v) || isNaN(i)) {
      alert('Por favor ingresa valores numéricos válidos');
      return;
    }

    const potencia = v * i;
    setResultado(potencia);

    const idUnico = Date.now().toString();
    const timestampActual = new Date().toISOString();

    // Guardamos localmente mediante SQLite / Mock web
    await guardarCalculoLocal(idUnico, v, potencia, timestampActual);
    await cargarHistorial();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>VoltCalc Mobile</Text>
      <Text style={styles.subtitle}>Sistema de Cálculo y Respaldo Offline</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Voltaje (V):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 12"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={voltaje}
          onChangeText={setVoltaje}
        />

        <Text style={styles.label}>Corriente (A):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 2.5"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={corriente}
          onChangeText={setCorriente}
        />

        <TouchableOpacity style={styles.button} onPress={calcularPotencia}>
          <Text style={styles.buttonText}>Calcular Potencia (W)</Text>
        </TouchableOpacity>

        {resultado !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Resultado: {resultado.toFixed(2)} W</Text>
          </View>
        )}
      </View>

      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Historial Local (SQLite)</Text>
        {historial.length === 0 ? (
          <Text style={styles.emptyText}>No hay registros guardados aún.</Text>
        ) : (
          historial.map((item, index) => (
            <View key={item.id || index} style={styles.historyItem}>
              <Text style={styles.historyText}>Voltaje: {item.valor_voltaje ?? item.voltaje} V</Text>
              <Text style={styles.historyText}>Potencia: {item.resultado ?? item.potencia} W</Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#38bdf8',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: '#f1f5f9',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    color: '#fff',
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0284c7',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#064e3b',
    borderRadius: 8,
    alignItems: 'center',
  },
  resultText: {
    color: '#34d399',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historySection: {
    marginTop: 30,
    width: '100%',
    maxWidth: 400,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f8fafc',
    marginBottom: 10,
  },
  emptyText: {
    color: '#64748b',
    fontStyle: 'italic',
  },
  historyItem: {
    backgroundColor: '#1e293b',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#38bdf8',
  },
  historyText: {
    color: '#cbd5e1',
    fontSize: 14,
  },
});