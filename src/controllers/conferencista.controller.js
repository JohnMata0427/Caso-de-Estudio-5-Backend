import { prisma } from '../database.js';

export const registrarConferencista = async ({ body }, res) => {
	if (Object.values(body).includes(''))
		return res.status(400).json({ res: 'Todos los campos son requeridos' });

	body.fecha_nacimiento = new Date(body.fecha_nacimiento);

	await prisma.conferencista.create({
		data: body,
	});

	res.status(201).json({ res: 'Conferencista registrado correctamente' });
};

export const obtenerConferencistas = async (_, res) => {
	res.status(200).json(await prisma.conferencista.findMany());
};

export const obtenerConferencistaPorId = async ({ params: { id } }, res) => {
	const conferencista = await prisma.conferencista.findUnique({
		where: { id: +id },
		include: {
			Reserva: true,
		},
	});

	if (!conferencista)
		return res
			.status(404)
			.json({ res: 'El conferencista solicitado no existe' });

	res.status(200).json(conferencista);
};

export const actualizarConferencista = async (
	{ params: { id }, body },
	res
) => {
	try {
		body?.fecha_nacimiento = new Date(body?.fecha_nacimiento);

		await prisma.conferencista.update({
			where: { id: +id },
			data: body,
		});

		res.status(200).json({
			res: 'Conferencista actualizado correctamente',
		});
	} catch (error) {
		res.status(404).json({ res: 'El conferencista solicitado no existe' });
	}
};

export const eliminarConferencista = async ({ params: { id } }, res) => {
	try {
		await prisma.conferencista.delete({
			where: { id: +id },
		});

		res.status(200).json({ res: 'Conferencista eliminado correctamente' });
	} catch (error) {
		console.log(error);
		res.status(404).json({ res: 'El conferencista solicitado no existe' });
	}
};
