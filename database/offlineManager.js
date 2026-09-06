import { Platform } from 'react-native';

// Variable segura para evitar requerir el módulo nativo en la web
let db = null;

const getDb = () => {
  if (Platform.OS !== 'web' && !db) {
    try {
      const SQLite = require('expo-sqlite');
      db = SQLite.openDatabaseSync('voltcalc.db');
    } catch (e) {
      console.warn('SQLite no disponible en este entorno');
    }
  }
  return db;
};

export const initDatabase = async () => {
  if (Platform.OS === 'web') {
    console.log('Modo Web: SQLite simulado en memoria.');
    return;
  }
  try {
    const database = getDb();
    if (database) {
      database.execSync(`
        CREATE TABLE IF NOT EXISTS calculos (
          id TEXT PRIMARY KEY NOT NULL,
          valor_voltaje REAL,
          resultado REAL,
          timestamp TEXT,
          sincronizado INTEGER
        );
      `);
    }
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
};

export const guardarCalculoLocal = async (id, voltaje, resultado, timestamp) => {
  if (Platform.OS === 'web') {
    console.log('Guardado simulado (Web):', { id, voltaje, resultado });
    return;
  }
  try {
    const database = getDb();
    if (database) {
      database.runSync(
        'INSERT INTO calculos (id, valor_voltaje, resultado, timestamp, sincronizado) VALUES (?, ?, ?, ?, ?);',
        [id, voltaje, resultado, timestamp, 0]
      );
    }
  } catch (error) {
    console.error('Error al guardar localmente:', error);
  }
};

export const obtenerCalculosLocales = async () => {
  if (Platform.OS === 'web') {
    return [
      { id: '1', valor_voltaje: 12, resultado: 24, timestamp: new Date().toISOString(), sincronizado: 0 }
    ];
  }
  try {
    const database = getDb();
    if (database) {
      return database.getAllSync('SELECT * FROM calculos ORDER BY timestamp DESC;');
    }
    return [];
  } catch (error) {
    console.error('Error al obtener historial:', error);
    return [];
  }
};