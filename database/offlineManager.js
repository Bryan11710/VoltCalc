/**
 * Inserta un cálculo eléctrico en la base de datos local SQLite
 */
export async function guardarCalculoLocalmente(tipo, valor1, valor2, resultado) {
  try {
    const database = getDb(); // Usando tu función existente de obtención de DB
    if (!database) return;

    // Crear tabla si no existe
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS historial_calculos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tipo TEXT NOT NULL,
        valor1 TEXT,
        valor2 TEXT,
        resultado TEXT,
        fecha TEXT
      );
    `);

    const fechaActual = new Date().toISOString();

    // Insertar registro de forma segura
    await database.runAsync(
      `INSERT INTO historial_calculos (tipo, valor1, valor2, resultado, fecha) VALUES (?, ?, ?, ?, ?);`,
      [tipo, String(valor1), String(valor2), String(resultado), fechaActual]
    );

    console.log('Cálculo almacenado exitosamente en la base de datos local.');
  } catch (error) {
    console.error('Error al guardar el cálculo en SQLite:', error);
  }
}