import { Router } from "express";
import {
	registrarReserva,
	obtenerReservas,
	obtenerReservaPorId,
	actualizarReserva,
	eliminarReserva,
} from "../controllers/reserva.controller.js";
import { validarUsuario } from "../middlewares/auth.middleware.js";

const router = Router();

router
	.route("/reservas")
	.post(validarUsuario, registrarReserva)
	.get(validarUsuario, obtenerReservas);

router
	.route("/reserva/:id")
	.get(validarUsuario, obtenerReservaPorId)
	.put(validarUsuario, actualizarReserva)
	.delete(validarUsuario, eliminarReserva);

export default router;
