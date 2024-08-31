import { Router } from "express";
import {
	registrarUsuario,
	loginUsuario,
	perfilUsuario,
	obtenerUsuarios,
	obtenerUsuarioPorId,
	actualizarUsuario,
	eliminarUsuario,
	actualizarContrasena,
} from "../controllers/usuario.controller.js";
import { validarUsuario } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);
router.get("/perfil", validarUsuario, perfilUsuario);

router.get("/usuarios", validarUsuario, obtenerUsuarios);

router
	.route("/usuario/:id")
	.get(validarUsuario, obtenerUsuarioPorId)
	.put(validarUsuario, actualizarUsuario)
	.delete(validarUsuario, eliminarUsuario);

router.put("/actualizarpassword", validarUsuario, actualizarContrasena);

export default router;
