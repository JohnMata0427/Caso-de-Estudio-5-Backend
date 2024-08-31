import prisma from "../database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registrarUsuario = async (req, res) => {
	if (Object.values(req.body).includes(""))
		return res.status(400).json({ res: "Todos los campos son requeridos" });

	const { email, password } = req.body;

	const emailExistente = await prisma.usuario.findUnique({
		where: { email },
	});

	if (emailExistente)
		return res.status(400).json({ res: "El email ya está registrado" });

	req.body.password = await bcrypt.hash(password, await bcrypt.genSalt(10));

	const usuario = await prisma.usuario.create({
		data: req.body,
	});

	res.status(201).json({ res: "Usuario registrado correctamente", usuario });
};

export const loginUsuario = async (req, res) => {
	const { email, password } = req.body;

	const usuario = await prisma.usuario.findUnique({
		where: { email },
	});

	if (!usuario)
		return res.status(404).json({ res: "El email no está registrado" });

	const passwordValido = await bcrypt.compare(password, usuario.password);

	if (!passwordValido)
		return res.status(400).json({ res: "La contraseña es incorrecta" });

	const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
		expiresIn: "2h",
	});

	res.status(200).json({ res: "Inicio de sesión correcto", token, usuario });
};

export const perfilUsuario = async (req, res) => {
	delete req.usuarioBDD.password;
	res.status(200).json(req.usuarioBDD);
};

export const obtenerUsuarios = async (_, res) => {
	res.status(200).json(
		await prisma.usuario.findMany({
			select: { id: true, nombre: true, apellido: true, email: true },
		})
	);
};

export const obtenerUsuarioPorId = async (req, res) => {
	const usuario = await prisma.usuario.findUnique({
		where: { id: +req.params.id },
		select: { id: true, nombre: true, apellido: true, email: true },
	});

	if (!usuario)
		return res.status(404).json({ res: "El usuario solicitado no existe" });

	res.status(200).json(usuario);
};

export const actualizarUsuario = async (req, res) => {
	try {
		await prisma.usuario.update({
			where: { id: +req.params.id },
			data: req.body,
		});
		res.status(200).json({ res: "Usuario actualizado correctamente" });
	} catch (error) {
		res.status(400).json({ res: "El usuario solicitado no existe" });
	}
};

export const eliminarUsuario = async (req, res) => {
	try {
		await prisma.usuario.delete({
			where: { id: +req.params.id },
		});
		res.status(200).json({ res: "Usuario eliminado correctamente" });
	} catch (error) {
		res.status(400).json({ res: "El usuario solicitado no existe" });
	}
};

export const actualizarContrasena = async (req, res) => {
	const { password, newPassword } = req.body;

	const passwordValido = await bcrypt.compare(
		password,
		req.usuarioBDD.password
	);

	if (!passwordValido)
		return res
			.status(400)
			.json({ res: "La contraseña actual es incorrecta" });

	password = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));

	await prisma.usuario.update({
		where: { id: req.usuarioBDD.id },
		data: { password },
	});

	res.status(200).json({ res: "Contraseña actualizada correctamente" });
};
