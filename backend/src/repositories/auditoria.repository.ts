import type { PoolClient } from "pg";
import type { Auditoria } from "../interfaces/auditoria.interface.js";

export class AuditoriaRepository {


    static async consultarAuditoria(client: PoolClient) {
        return client.query(`
            SELECT * FROM auditoria_eventos;
        `);
        
    }

    static async filtrarAuditoriaPorEntidad(client: PoolClient, entidad: string, entidad_id: string) {
        return client.query( `
            SELECT * FROM auditoria_eventos
            WHERE entidad = $1 AND entidad_id = $2;
        `, [entidad, entidad_id]);
        
    }
}
