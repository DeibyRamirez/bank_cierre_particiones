import type { PoolClient } from "pg";
import type { Cierre } from "../interfaces/cierres.interface.js";

export class CierresRepository {

    static async iniciarCierre(data: Cierre, cliente: PoolClient) {
        return cliente.query(
            `INSERT INTO cierres 
            (particion_id, usuario_autorizador, fecha_inicio)
            VALUES ($1, $2, $3) RETURNING *`,
            [
                data.particion_id,
                data.usuario_autorizador, 
                new Date(), 
            ]
        );
    
    }

    static async finalizarCierre(id: string, fechaFin: string, cliente: PoolClient) {
        return cliente.query(
            `UPDATE cierres 
            SET fecha_fin = $1
            WHERE id = $2 RETURNING *`,
            [
                new Date(),
                id
            ]
        );
    }

    static  async resultadoCierre(id: string, resultado: string,  observacion: string, cliente: PoolClient) {
        return cliente.query(
            `UPDATE cierres
            SET resultado = $1,
                observacion = $2
            WHERE id = $3
            RETURNING *`,
            [resultado, observacion, id]
        );
    }

    static async historialCierresPorParticion(particionId: string, cliente: PoolClient) {
        return cliente.query(
            `SELECT * FROM cierres 
            WHERE particion_id = $1
            ORDER BY fecha_inicio DESC`,
            [particionId]
        );
    }

    static async historialCierres( cliente: PoolClient) {
        return cliente.query(
            'SELECT * FROM cierres'
        );
    }

    
}