import { Router } from "express";
import { ejecutarValidacion, verResultadosValidacion, todasValidaciones } from "../controllers/validaciones.controller.js";

const router = Router();

router.post('/', ejecutarValidacion);
router.get('/:id', verResultadosValidacion);
router.get('/', todasValidaciones);

export default router;