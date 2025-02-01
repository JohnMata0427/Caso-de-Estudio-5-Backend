import { prisma } from '../database.js';
import { hash, compare, genSalt } from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registrarUsuario = async ({ body }, res) => {
	if (Object.values(body).includes(''))
		return res.status(400).json({ res: 'Todos los campos son requeridos' });

	const { email, password } = body;

	if (await prisma.usuario.findUnique({ where: { email } }))
		return res.status(400).json({ res: 'El email ya está registrado' });

	body.password = await hash(password, await genSalt(10));

	const usuario = await prisma.usuario.create({ data: body });

	res.status(201).json({ res: 'Usuario registrado correctamente', usuario });
};

export const loginUsuario = async ({ body }, res) => {
	const { email, password } = body;

	const usuario = await prisma.usuario.findUnique({ where: { email } });

	if (!usuario)
		return res.status(404).json({ res: 'El email no está registrado' });

	if (!(await compare(password, usuario.password)))
		return res.status(400).json({ res: 'La contraseña es incorrecta' });

	const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
		expiresIn: '2h',
	});

	res.status(200).json({ res: 'Inicio de sesión correcto', token, usuario });
};

export const perfilUsuario = async ({ usuarioBDD }, res) => {
	delete usuarioBDD.password;
	res.status(200).json(usuarioBDD);
};

export const obtenerUsuarios = async (_, res) => {
	res.status(200).json(
		await prisma.usuario.findMany({
			select: { id: true, nombre: true, apellido: true, email: true },
		})
	);
};

export const obtenerUsuarioPorId = async ({ params: { id } }, res) => {
	const usuario = await prisma.usuario.findUnique({
		where: { id: +id },
		select: { id: true, nombre: true, apellido: true, email: true },
	});

	if (!usuario)
		return res.status(404).json({ res: 'El usuario solicitado no existe' });

	res.status(200).json(usuario);
};

export const actualizarUsuario = async ({ params: { id }, body }, res) => {
	try {
		await prisma.usuario.update({
			where: { id: +id },
			data: body,
		});
		res.status(200).json({ res: 'Usuario actualizado correctamente' });
	} catch (error) {
		res.status(400).json({ res: 'El usuario solicitado no existe' });
	}
};

export const eliminarUsuario = async ({ params: { id } }, res) => {
	try {
		await prisma.usuario.delete({ where: { id: +id } });

		res.status(200).json({ res: 'Usuario eliminado correctamente' });
	} catch (error) {
		res.status(400).json({ res: 'El usuario solicitado no existe' });
	}
};

export const actualizarContrasena = async ({ body, usuarioBDD }, res) => {
	let { password, newPassword } = body;

	if (!await compare(password, usuarioBDD.password))
		return res
			.status(400)
			.json({ res: 'La contraseña actual es incorrecta' });

	password = await hash(newPassword, await genSalt(10));

	await prisma.usuario.update({
		where: { id: usuarioBDD.id },
		data: { password },
	});

	res.status(200).json({ res: 'Contraseña actualizada correctamente' });
};
