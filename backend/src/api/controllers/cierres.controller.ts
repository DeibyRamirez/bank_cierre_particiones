import type { Request, Response } from "express";
import { CierresService } from "../../services/cierres.service.js";

export const iniciarCierre = async (req: Request, res: Response) => {
    try {
        const cierre = await CierresService.iniciarCierre(req.body);
        res.status(201).json(cierre);
    } catch (error) {
        res.status(500).json({ error: "Error al iniciar el cierre" });
    }
}

export const finalizarCierre = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(400).json({ error: 'ID de usuario requerido' });
            console.log('Usuario Actualizado Correctamente')
            return;
        }
        const cierre = await CierresService.finalizarCierre(id, req.body.fecha_fin);
        res.status(200).json(cierre);
    } catch (error) {
        res.status(500).json({ error: "Error al finalizar el cierre" });
    }
}

export const resultadoCierre = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (!id) {
            res.status(400).json({ error: 'ID de usuario requerido' });
            console.log('Cierre Actualizado Correctamente')
            return;
        }
        const cierre = await CierresService.resultadoCierre(id, req.body.resultado, req.body.observacion);
        res.status(200).json(cierre);
    } catch (error) {
        res.status(500).json({ error: "Error al registrar el resultado del cierre" });
    }
}

export const historialCierresPorParticion = async (req: Request, res: Response) => {
    try {

        const particionId = req.params.particionId
        if (!particionId) {
            res.status(400).json({ error: 'ID de usuario requerido' });
            console.log('Usuario Actualizado Correctamente')
            return;
        }

        const cierres = await CierresService.historialCierresPorParticion(particionId);
        res.status(200).json(cierres);
        console.log("Listado de Cierres por Particion");
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener el historial de cierres" });
    }
}

export const historialCierres = async (req: Request, res: Response) => {
    try {
        const cierres = await CierresService.historialCierres();
        res.status(200).json(cierres);
        console.log("Listado de Cierres");
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener el historial de cierres" });
    }
}