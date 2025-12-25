import type { Request, Response } from "express";
import { AuditoriaService } from "../../services/auditoria.service.js";

export const consultarAuditoria = async (req: Request, res: Response ) => {
    try {
        const resultado = await AuditoriaService.consultarAuditoria();
        res.status(200).json(resultado);
        console.log("Auditoria Correctamente ")
    } catch ( error ) {
        console.error( error );
        res.status(500).json({ error: 'Error al consultar la auditoría' });
    }
}

export const filtrarAuditoriaPorEntidad = async ( req: Request, res: Response ) => {
    try {
        const { entidad, entidad_id } = req.params;
        if (!entidad || !entidad_id) {
            res.status(400).json({ error: 'Los parámetros entidad y entidad_id son requeridos' });
            return;
        }
        const resultado = await AuditoriaService.filtrarAuditoriaPorEntidad(entidad, entidad_id);
        res.status(200).json(resultado);
        console.log(" Filtrado de Auditoria Correcto")
    }
    catch ( error ) {
        console.error( error );
        res.status(500).json({ error: 'Error al filtrar la auditoría por entidad' });
    }
}