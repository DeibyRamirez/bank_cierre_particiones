import { Router } from "express";
import { actualizarEstadoParticion, crearParticion, detallesParticion, listarParticiones } from "../controllers/particiones.controller.js";

const router = Router();

router.post('/', crearParticion);
router.get('/', listarParticiones);
router.get('/:id', detallesParticion);
router.put('/:id/estado', actualizarEstadoParticion);

export default router;