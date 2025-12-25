import { Router } from "express";
import { consultarAuditoria, filtrarAuditoriaPorEntidad } from "../controllers/auditoria.controller.js";

const router = Router();

router.get('/', consultarAuditoria);
router.get('/filtrar/:entidad/:entidad_id', filtrarAuditoriaPorEntidad);

export default router;