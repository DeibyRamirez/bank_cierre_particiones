import { Router } from "express";
import { crearUsuario, obtenerUsuarioPorId, listarUsuarios, actualizarUsuario } from "../controllers/usuarios.controller.js";

const router = Router();

router.post('/', crearUsuario);
router.get('/:id', obtenerUsuarioPorId);
router.get('/', listarUsuarios);
router.put('/:id', actualizarUsuario);

export default router;

