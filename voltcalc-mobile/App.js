import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const probarConexion = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      // Usamos un tiempo límite (timeout) de 5 segundos para que no se quede cargando infinito
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch('https://voltcalc-bryan.loca.lt/api/optimized', {
  method: 'GET',
  headers: {
    'Bypass-Tunnel-Reminder': 'true'
  },
  signal: controller.signal
});
      
      clearTimeout(timeoutId);
      const json = await response.json();
      setData(json);
    } catch (err) {
      if (err.name === 'AbortError') {
        setError('La conexión tardó demasiado. Revisa si el servidor o el Firewall bloquean la conexión.');
      } else {
        setError(err.message + ' (¿Está encendido tu backend en la PC?)');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>VoltCalc Móvil</Text>
      <Text style={styles.subtitle}>Prueba de Conectividad</Text>

      <TouchableOpacity style={styles.button} onPress={probarConexion}>
        <Text style={styles.buttonText}>Consultar API Backend</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#007AFF" style={{marginTop: 20}} />}

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>¡Error de conexión!</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {data && (
        <View style={styles.resultBox}>
          <Text style={styles.success}>¡Conexión Exitosa!</Text>
          <Text>{JSON.stringify(data, null, 2)}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f5f5f5', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 30 },
  button: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  errorBox: { marginTop: 20, backgroundColor: '#ffebee', padding: 15, borderRadius: 8, width: '100%' },
  errorTitle: { color: '#c62828', fontWeight: 'bold', marginBottom: 5 },
  errorText: { color: '#c62828', fontSize: 14 },
  resultBox: { marginTop: 20, backgroundColor: '#e8f5e9', padding: 15, borderRadius: 8, width: '100%' },
  success: { color: '#2e7d32', fontWeight: 'bold', marginBottom: 5 }
});