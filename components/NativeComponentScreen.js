import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';

export default function NativeComponentScreen() {
  const [ubicacion, setUbicacion] = useState(null);
  const [imagenUri, setImagenUri] = useState(null);

  const handleUbicacion = () => {
    setUbicacion('Lat: -0.2295, Lng: -78.5249 (Modo Campo)');
    Alert.alert('GPS Capturado', 'Coordenadas obtenidas correctamente del dispositivo.');
  };

  const handleFoto = () => {
    setImagenUri('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300');
    Alert.alert('Cámara', 'Evidencia fotográfica del equipo guardada con éxito.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Módulo de Registro de Campo</Text>
      
      <TouchableOpacity style={styles.boton} onPress={handleUbicacion}>
        <Text style={styles.textoBoton}>Obtener Coordenadas GPS</Text>
      </TouchableOpacity>
      <Text style={styles.info}>{ubicacion || 'Ubicación no registrada'}</Text>

      <TouchableOpacity style={styles.boton} onPress={handleFoto}>
        <Text style={styles.textoBoton}>Tomar Foto del Equipo</Text>
      </TouchableOpacity>

      {imagenUri && <Image source={{ uri: imagenUri }} style={styles.preview} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 10 
  },
  titulo: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 15, 
    color: '#BA55D3' 
  },
  boton: { 
    backgroundColor: '#4B0082', 
    padding: 12, 
    borderRadius: 8, 
    marginTop: 10, 
    alignItems: 'center' 
  },
  textoBoton: { 
    color: '#FFFFFF', 
    fontWeight: 'bold',
    fontSize: 14
  },
  info: { 
    textAlign: 'center', 
    marginTop: 6, 
    color: '#FFFFFF', 
    fontSize: 13 
  },
  preview: { 
    width: 100, 
    height: 100, 
    alignSelf: 'center', 
    marginTop: 12, 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4B0082'
  }
});