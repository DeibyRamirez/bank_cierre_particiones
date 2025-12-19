import dotenv from 'dotenv';
import { Pool } from 'pg';


dotenv.config();

// Configuración de la base de datos desde variables de entorno
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;
const DB_USEr = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';
const DB_NAME = process.env.DB_NAME || 'cierre_particiones';


// Pool de conexiones a la base de datos
export const pool = new Pool({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USEr,
    password: DB_PASSWORD,
    database: DB_NAME,
    ssl: false, // liego en rpoduccion se activa
    max: 10, // número máximo de conexiones en el pool
    idleTimeoutMillis: 30000, // tiempo antes de cerrar una conexión inactiva
    connectionTimeoutMillis: 2000, // tiempo máximo para conectar
});

// Preuba de conexión
pool.on('connect', () => {
    console.log('Conectado a la base de datos');
});

pool.on('error', (err) => {
    console.error('Error en la conexión a la base de datos PostgreSQL', err);
    process.exit(1);
});