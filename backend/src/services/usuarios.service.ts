import { pool } from "../database.js";
import type { Usuario } from "../interfaces/usuario.interface.js";
import { UsuariosRepository } from "../repositories/usuarios.repository.js";

export class UsuariosService {
    // Método existente para registrar un usuario
    static async registrarUsuario(data: Usuario) {
        // Obtener una conexión del pool
        const client = await pool.connect();

        // Iniciar una transacción
        try {
            // Esperamos la creación del usuario
            await client.query('BEGIN');
            
            const resultado = await UsuariosRepository.crearUsuario(client, data );

            // Confirmar la transacción
            await client.query('COMMIT');
            // Devolver el usuario creado
            return resultado.rows[0];

        // Manejar errores y hacer rollback si es necesario
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;

        // Liberar el cliente de la conexión
        } finally {
            client.release();
        }
    }

    // Nuevo método para obtener un usuario por ID usando el repositorio
    static async obtenerUsuarioPorId(id: string) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const resultado = await UsuariosRepository.usuarioPorId(client, id);

            await client.query('COMMIT');
            return resultado.rows[0];

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;

        }finally {
            client.release();
        }
    }
    
    // Nuevo método para listar usuarios con paginación usando el repositorio
    static async listarUsuarios(offset: number, limit: number) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const resultado = await UsuariosRepository.listaUsuarios(client, offset, limit);
            await client.query('COMMIT');
            return resultado.rows; // No usamos el rows[0] porque queremos todos los usuarios obtenidos, el rows nos permite traer todos los registros
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    static async actualizarUsuario(id: string, data: Partial<Usuario>) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const resultado = await UsuariosRepository.actualizarUsuario(client, id, data);

            await client.query('COMMIT');
            return resultado.rows[0];

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
            
        } finally {
            client.release();
        }
    }
}