import { Router } from "express";
import { iniciarCierre, finalizarCierre, resultadoCierre, historialCierres, historialCierresPorParticion} from "../controllers/cierres.controller.js";

const router = Router();

router.post('/', iniciarCierre);
router.put('/:id/finalizar', finalizarCierre);
router.put('/:id/resultado', resultadoCierre);
router.get('/', historialCierres);
router.get('/historial/:particionId', historialCierresPorParticion);

export default router;