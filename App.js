import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';

// Componente 1: Botón Reutilizable integrado
const CustomButton = ({ title, onPress, loading, disabled }) => (
  <TouchableOpacity
    style={[styles.button, (disabled || loading) && styles.disabled]}
    onPress={onPress}
    disabled={disabled || loading}
    accessibilityRole="button"
  >
    {loading ? (
      <ActivityIndicator color="#FFFFFF" />
    ) : (
      <Text style={styles.text}>{title}</Text>
    )}
  </TouchableOpacity>
);

// Componente 2: Tarjeta de Estado Reutilizable integrada
const StatusCard = ({ status, data }) => {
  let messageContent = null;
  let statusStyle = styles.idle;

  if (status === 'loading') {
    messageContent = <Text style={styles.textLoading}>Consultando servidor...</Text>;
    statusStyle = styles.loading;
  } else if (status === 'success') {
    messageContent = (
      <>
        <Text style={styles.textSuccess}>¡Conexión Exitosa!</Text>
        <Text style={styles.dataText}>{JSON.stringify(data, null, 2)}</Text>
      </>
    );
    statusStyle = styles.success;
  } else if (status === 'error') {
    messageContent = <Text style={styles.textError}>Error de conectividad con el backend.</Text>;
    statusStyle = styles.error;
  } else {
    messageContent = <Text style={styles.textIdle}>Presione el botón para iniciar la prueba.</Text>;
  }

  return (
    <View style={[styles.card, statusStyle]}>
      {messageContent}
    </View>
  );
};

export default function App() {
  const [status, setStatus] = useState('idle');
  const [apiData, setApiData] = useState(null);

  const handleFetchData = async () => {
    setStatus('loading');
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('https://fifty-goats-juggle.loca.lt/api/optimized', {
        method: 'GET',
        headers: { 'Bypass-Tunnel-Reminder': 'true' },
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      const json = await response.json();
      
      setApiData(json);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerTitle}>VoltCalc Móvil</Text>
        <Text style={styles.headerSubtitle}>Prueba de Conectividad con el Backend</Text>

        <CustomButton 
          title="Consultar API Backend" 
          onPress={handleFetchData} 
          loading={status === 'loading'} 
        />
        
        <StatusCard status={status} data={apiData} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F2F2F7', 
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: { 
    padding: 20,
    maxWidth: 500,
    width: '100%',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#3A3A3C',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    marginVertical: 8,
  },
  disabled: {
    backgroundColor: '#A1A1A6',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  idle: { borderColor: '#C7C7CC' },
  loading: { borderColor: '#007AFF' },
  success: { borderColor: '#34C759', backgroundColor: '#E8F8EC' },
  error: { borderColor: '#FF3B30', backgroundColor: '#FDECEA' },
  textSuccess: { color: '#248A3D', fontWeight: 'bold', fontSize: 16 },
  textError: { color: '#D70015', fontWeight: 'bold', fontSize: 16 },
  textLoading: { color: '#007AFF', fontSize: 16 },
  textIdle: { color: '#3A3A3C', fontSize: 16 },
  dataText: { marginTop: 8, fontFamily: 'monospace', color: '#1C1C1E' },
});