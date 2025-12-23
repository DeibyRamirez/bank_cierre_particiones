import { UsuariosService } from "../../services/usuarios.service.js";
import type { Request, Response } from "express";

// Controlador existente para crear un usuario
export const crearUsuario = async (req: Request, res: Response) => {
    try {

        const resultado = await UsuariosService.registrarUsuario(req.body)
        res.status(201).json(resultado);
        console.log('Usuario Creado Correctamente')
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
}

// Nuevo controlador para obtener un usuario por ID
export const obtenerUsuarioPorId = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ error: 'ID de usuario requerido' });
            console.log('Usuario encontrado')
            return;
        }
        const resultado = await UsuariosService.obtenerUsuarioPorId(id);
        if (resultado) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }

    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
}

// Nuevo controlador para listar usuarios con paginación
export const listarUsuarios = async (req: Request, res: Response) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const resultado = await UsuariosService.listarUsuarios(offset, limit);
        res.status(200).json(resultado);
        console.log('Usuarios Listos')
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al listar los usuarios' });
    }
}

// Nuevo controlador para actualizar un usuario
export const actualizarUsuario = async (req: Request, res: Response) => {
    try {

        const id = req.params.id;
        if (!id) {
            res.status(400).json({ error: 'ID de usuario requerido' });
            console.log('Usuario Actualizado Correctamente')
            return;
        }
        const resultado = await UsuariosService.actualizarUsuario(id, req.body);
        if (resultado) {
            res.status(200).json(resultado);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
}