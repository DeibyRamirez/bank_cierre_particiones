import { pool } from "../database.js";
import type { Cierre } from "../interfaces/cierres.interface.js";
import { CierresRepository } from "../repositories/cierres.repository.js";

export class CierresService {
    
    static async iniciarCierre(data: Cierre) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const resultado = await CierresRepository.iniciarCierre(data, client);
            await client.query('COMMIT');
            return resultado.rows[0];
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }

    static async finalizarCierre(id: string, fechaFin: string) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const resultado = await CierresRepository.finalizarCierre(id, fechaFin, client);
            await client.query('COMMIT');
            return resultado.rows[0];
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }

    static async resultadoCierre(id: string, resultado: string, observacion: string) {
        const client = await pool.connect();  
        try {
            await client.query('BEGIN');
            const res = await CierresRepository.resultadoCierre(id, resultado, observacion, client);
            await client.query('COMMIT');
            return res.rows[0];
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }

    static async historialCierresPorParticion(particionId: string) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const resultado = await CierresRepository.historialCierresPorParticion(particionId, client);
            await client.query('COMMIT');
            return resultado.rows;
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }

    static async historialCierres() {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            const resultado = await CierresRepository.historialCierres(client);
            await client.query('COMMIT');
            return resultado.rows;
        }
        catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }
    }
}