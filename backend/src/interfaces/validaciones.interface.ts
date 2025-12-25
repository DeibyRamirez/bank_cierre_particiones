export interface Validacion {
    id?: string;
    cierre_id: string;
    tipo_validacion: string;
    resultado: boolean;
    detalle?: string;
    fecha?: Date;
}