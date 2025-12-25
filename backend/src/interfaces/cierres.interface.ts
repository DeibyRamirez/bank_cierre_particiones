export interface Cierre {
    id?: string;
    particion_id: string;
    usuario_autorizador: string;
    fecha_inicio: Date;
    fecha_fin?: Date;
    resultado?: string;
    observacion?: string;
}

export interface CierreResumen {
    id: string;
    particion_id: string;
    usuario_autorizador: string;
    fecha_inicio: Date;
    fecha_fin?: Date;
    resultado?: string;
}