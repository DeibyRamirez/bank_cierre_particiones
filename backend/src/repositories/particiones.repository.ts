import type { PoolClient } from "pg";
import type { Particiones } from "../interfaces/particiones.interface.js";

export class ParticionesRepository {

    static async crearParticion(cliente: PoolClient, particion: Particiones) {
        return cliente.query('INSERT INTO particiones (nombre, descripcion, tipo, fecha_operativa, estado, fecha_creacion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [
                particion.nombre,
                particion.descripcion || null,
                particion.tipo,
                particion.fecha_operativa,
                particion.estado || 'ABIERTA',
                new Date()
            ]
        );
        
    }

    static async listarParticiones(cliente: PoolClient) {
        return cliente.query('SELECT * FROM particiones',
        );
    }

    static async detallesParticion(cliente: PoolClient, particionId: string) {
        return cliente.query('SELECT * FROM particiones WHERE id = $1', [particionId]);
    }

    static async actualizarEstadoParticion(cliente: PoolClient, particionId: string, estado: string) {
        return cliente.query('UPDATE particiones SET estado = $1 WHERE id = $2 RETURNING *', [estado, particionId]);
    }
}