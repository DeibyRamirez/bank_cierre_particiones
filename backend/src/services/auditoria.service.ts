import { AuditoriaRepository } from "../repositories/auditoria.repository.js";
import { pool } from "../database.js";

export class AuditoriaService {

    static async consultarAuditoria() {
        const cliente =  await pool.connect();

        try {
            await cliente.query('BEGIN');
            const resultado = await AuditoriaRepository.consultarAuditoria(cliente);

            await cliente.query('COMMIT');
            return resultado;

        } catch (error) {
            await cliente.query('ROLLBACK');
            throw error;
        } finally {
            cliente.release();
        }
    }

    static async filtrarAuditoriaPorEntidad( entidad: string, entidad_id: string) {
        const cliente = await  pool.connect();
        try {
            await cliente.query('BEGIN');
            const resultado = await AuditoriaRepository.filtrarAuditoriaPorEntidad(cliente, entidad, entidad_id);
            await cliente.query('COMMIT');
            return resultado;
            
        } catch (error) {
            await cliente.query('ROLLBACK');
            throw error;
        } finally {
            cliente.release();
        }
    }

    
}