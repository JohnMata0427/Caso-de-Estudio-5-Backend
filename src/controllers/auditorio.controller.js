import { prisma } from '../database.js';

export const registrarAuditorio = async ({ body }, res) => {
	if (Object.values(body).includes(''))
		return res.status(400).json({ res: 'Todos los campos son requeridos' });

	const auditorio = await prisma.auditorio.create({ data: body });

	res.status(201).json({
		res: 'Auditorio registrado correctamente',
		auditorio,
	});
};

export const obtenerAuditorios = async (_, res) => {
	res.status(200).json(await prisma.auditorio.findMany());
};

export const obtenerAuditorioPorId = async ({ params: { id } }, res) => {
	const auditorio = await prisma.auditorio.findUnique({
		where: { id: +id },
		include: {
			Reserva: true,
		},
	});

	if (!auditorio)
		return res
			.status(404)
			.json({ res: 'El auditorio solicitado no existe' });

	res.status(200).json(auditorio);
};

export const actualizarAuditorio = async ({ params: { id }, body }, res) => {
	try {
		const auditorio = await prisma.auditorio.update({
			where: { id: +id },
			data: body,
		});

		res.status(200).json({
			res: 'Auditorio actualizado correctamente',
			auditorio,
		});
	} catch (error) {
		res.status(404).json({ res: 'El auditorio solicitado no existe' });
	}
};

export const eliminarAuditorio = async ({ params: { id } }, res) => {
	try {
		await prisma.auditorio.delete({ where: { id: +id } });

		res.status(200).json({ res: 'Auditorio eliminado correctamente' });
	} catch (error) {
		res.status(404).json({ res: 'El auditorio solicitado no existe' });
	}
};
