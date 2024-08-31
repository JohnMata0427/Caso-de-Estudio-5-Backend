import { Router } from "express";
import {
	registrarConferencista,
	obtenerConferencistas,
	obtenerConferencistaPorId,
	actualizarConferencista,
	eliminarConferencista,
} from "../controllers/conferencista.controller.js";
import { validarUsuario } from "../middlewares/auth.middleware.js";

const router = Router();

router
	.route("/conferencistas")
	.post(validarUsuario, registrarConferencista)
	.get(validarUsuario, obtenerConferencistas);

router
	.route("/conferencista/:id")
	.get(validarUsuario, obtenerConferencistaPorId)
	.put(validarUsuario, actualizarConferencista)
	.delete(validarUsuario, eliminarConferencista);

export default router;
