import type { PoolClient } from "pg";
import type { Validacion } from "../interfaces/validaciones.interface.js";

export class ValidacionRepository {


    static async ejecutarValidacion(cliente: PoolClient, data: Validacion) {
        return cliente.query(`
            INSERT INTO validaciones (cierre_id, tipo_validacion, resultado, detalle, fecha)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        `, [
            data.cierre_id,
            data.tipo_validacion,
            data.resultado,
            data.detalle || null,
            data.fecha || new Date()
        ]);
    }
    

    static async verResultadosValidacion(cliente: PoolClient, id: string) {
        return cliente.query(`
            SELECT * FROM validaciones
            WHERE cierre_id = $1;
        `, [id]);
    }

    static async todasValidaciones(cliente: PoolClient) {
        return cliente.query(`
            SELECT * FROM validaciones;`);
    }
}