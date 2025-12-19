import { pool } from './database.js';

async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()');
        console.log('Conexión exitosa a la base de datos', result.rows[0]);
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    } finally {
        await pool.end();
    }
}

testConnection();