import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const StatusCard = ({ status, data }) => {
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
    <View style={[styles.card, statusStyle]} accessibilityLiveRegion="polite">
      {messageContent}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 12,
    backgroundColor: '#F2F2F7',
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