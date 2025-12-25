export interface Auditoria {
    id?: string;
    entidad: string;
    entidad_id: string;
    accion: string;
    usuario_id?: string;
    fecha_evento?: Date;
    ip_origen?: string;
    detalle?: string;
    hash_integridad?: string;
}
