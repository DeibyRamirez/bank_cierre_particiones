import express from 'express';
import { getHealth } from './api/controllers/health.controller.js';
import usuariosRoutes from './api/routes/usuarios.routes.js';
import particionesRoutes from './api/routes/particiones.routes.js';
import validacionesRoutes from './api/routes/validaciones.routes.js';
import cierresRoutes from './api/routes/cierres.routes.js';
import auditoriaRoutes from './api/routes/auditoria.routes.js';

export const app = express();

app.use(express.json());
app.get('/health', getHealth);

app.use('/usuarios', usuariosRoutes)
app.use('/particiones', particionesRoutes)
app.use('/validaciones', validacionesRoutes)
app.use('/cierres', cierresRoutes)
app.use('/auditoria', auditoriaRoutes)
