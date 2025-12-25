import { pool } from "../database.js";
import type { Validacion } from "../interfaces/validaciones.interface.js";
import { ValidacionRepository } from "../repositories/validaciones.repository.js";

export class ValidacionService {
    static async ejecutarValidacion( data: Validacion) {
        const cliente = await pool.connect();
        try {
            await cliente.query('BEGIN');
            const resultado = await ValidacionRepository.ejecutarValidacion(cliente, data);
            
            await cliente.query('COMMIT');
            return resultado.rows[0];
        
        }
        catch (error) {
            await cliente.query('ROLLBACK');
            throw error;
        }
        finally {
            cliente.release();

        }
    }

    static async verResultadosValidacion(id: string) {
        const cliente = await pool.connect();
        try {
            await cliente.query('BEGIN');
            const resultado = await ValidacionRepository.verResultadosValidacion(cliente, id);
            
            await cliente.query('COMMIT');
            return resultado.rows;
        }
        catch (error) {
            await cliente.query('ROLLBACK');
            throw error;
        }
        finally {
            cliente.release();
        }
    }

    static async todasValidaciones() {
        const cliente = await pool.connect();
         try {
            await cliente.query('BEGIN');
            const resultado = await ValidacionRepository.todasValidaciones(cliente);
            
            await cliente.query('COMMIT');
            return resultado.rows;
        }
        catch (error) {
            await cliente.query('ROLLBACK');
            throw error;
        }
        finally {
            cliente.release();
        }

    }
}