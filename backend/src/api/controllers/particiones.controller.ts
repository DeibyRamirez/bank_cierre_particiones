import { ParticionesService } from "../../services/particiones.service.js";
import type { Request, Response } from "express";

export const crearParticion = async (req: Request, res: Response) => {
    try {
        const resultado = await ParticionesService.crearParticion(req.body);
        res.status(201).json(resultado);
        console.log("Particion creada correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la partición' });
    }   
}

export const listarParticiones = async (req: Request, res: Response) => {
    try {
        const resultado = await ParticionesService.listarParticiones();
        res.status(200).json(resultado);
        console.log("Particiones exitosas");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al listar las particiones' });
    }   
}

export const detallesParticion = async (req: Request, res: Response) => {
    try {

        const id = req.params.id;
        if (!id) {
            res.status(400).json({ error: 'ID de usuario requerido' });
            console.log('Usuario Actualizado Correctamente')
            return;
        }

        const resultado = await ParticionesService.detallesParticion(id);
        res.status(200).json(resultado);
         console.log("Particion Encontrada");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los detalles de la partición' });
    }   
}
export const actualizarEstadoParticion = async (req: Request, res: Response) => {
    try {

        const id = req.params.id;
        if (!id) {
            res.status(400).json({ error: 'ID de usuario requerido' });
            return;
        }

        const resultado = await ParticionesService.actualizarEstadoParticion(id, req.body.estado);
        res.status(200).json(resultado);
        console.log('Particion Actualizada Correctamente')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el estado de la partición' });
    }   
}