import type { Request, Response } from "express";
import { ValidacionService } from "../../services/validaciones.service.js";

export const ejecutarValidacion = async (req: Request, res: Response) => {
    try {
        const resultado = await ValidacionService.ejecutarValidacion(req.body);
        res.status(201).json(resultado);
        console.log(" Validacion Ejecutada exitosamente")

    } catch (error) {
        res.status(500).json({ error: 'Error al ejecutar la validación' });
    }
}

export const verResultadosValidacion = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({ error: 'cierreId es requerido' });
        }
        const resultados = await ValidacionService.verResultadosValidacion(id);
        res.status(200).json(resultados);
        console.log(" Resultado de Validacionó disponible")
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los resultados de la validación' });
    }
}

export const todasValidaciones = async (req: Request, res: Response) => {
    try {
        const resultados = await ValidacionService.todasValidaciones();
        res.status(200).json(resultados);
        console.log(" Todas la validaciones disponibles ")
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los resultados de la validaciónes' });
    }
}