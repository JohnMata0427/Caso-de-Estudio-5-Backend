import { Router } from "express";
import {
	registrarAuditorio,
	obtenerAuditorios,
	obtenerAuditorioPorId,
	actualizarAuditorio,
	eliminarAuditorio,
} from "../controllers/auditorio.controller.js";
import { validarUsuario } from "../middlewares/auth.middleware.js";

const router = Router();

router
	.route("/auditorios")
	.post(validarUsuario, registrarAuditorio)
	.get(validarUsuario, obtenerAuditorios);

router
	.route("/auditorio/:id")
	.get(validarUsuario, obtenerAuditorioPorId)
	.put(validarUsuario, actualizarAuditorio)
	.delete(validarUsuario, eliminarAuditorio);

export default router;
