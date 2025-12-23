import { pool } from "../database.js";
import type { Particiones } from "../interfaces/particiones.interface.js";
import { ParticionesRepository } from "../repositories/particiones.repository.js";

export class ParticionesService {

    static async crearParticion(particion: Particiones) {
        const client = await pool.connect();

        try {

            await client.query('BEGIN');
            const resultado = await ParticionesRepository.crearParticion(client, particion);
            await client.query('COMMIT');
            return resultado.rows[0];

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;

        }
        finally {
            client.release();
        }
    }

    static async listarParticiones() {
        const client = await pool.connect();

        try {

            await client.query('BEGIN');
            const resultado = await ParticionesRepository.listarParticiones(client);

            await client.query('COMMIT');
            return resultado.rows;

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;

        } finally {
            client.release();
        }

    }

    static async detallesParticion(particionId: string) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const resultado = await ParticionesRepository.detallesParticion(client, particionId);
            await client.query('COMMIT');
            return resultado.rows;

        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            client.release();
        }

    }
    static async actualizarEstadoParticion(particionId: string, estado: string) {
        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const resultado = await ParticionesRepository.actualizarEstadoParticion(client, particionId, estado);
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