export interface Particiones {
    id?: string;
    nombre: string;
    descripcion?: string;
    tipo : string; // diario, mensual, sucursal
    fecha_operativa: Date;
    estado?: string; // ABIERTA, EN_PROCESO, CERRADA, BLOQUEADA
    fecha_creacion?: Date;
}

export interface ParticionDetalle {
    id?: string;
    particion_id: string;
    cuenta_contable: string;
    monto: number;
    descripcion?: string;
}