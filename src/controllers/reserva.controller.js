import { prisma } from '../database.js';

export const registrarReserva = async ({ body }, res) => {
	if (Object.values(body).includes(''))
		return res.status(400).json({ res: 'Todos los campos son requeridos' });

	const reserva = await prisma.reserva.create({ data: body });

	res.status(201).json({ res: 'Reserva registrada correctamente', reserva });
};

export const obtenerReservas = async (_, res) => {
	res.status(200).json(await prisma.reserva.findMany());
};

export const obtenerReservaPorId = async ({ params: { id } }, res) => {
	const reserva = await prisma.reserva.findUnique({
		where: { id: +id },
		include: {
			conferencista: true,
			auditorio: true,
		},
	});

	if (!reserva)
		return res.status(404).json({ res: 'La reserva solicitada no existe' });

	res.status(200).json(reserva);
};

export const actualizarReserva = async ({ params: { id }, body }, res) => {
	try {
		const reserva = await prisma.reserva.update({
			where: { id: +id },
			data: body,
		});

		res.status(200).json({
			res: 'Reserva actualizada correctamente',
			reserva,
		});
	} catch (error) {
		res.status(404).json({ res: 'La reserva solicitada no existe' });
	}
};

export const eliminarReserva = async ({ params: { id } }, res) => {
	try {
		await prisma.reserva.delete({ where: { id: +id } });

		res.status(200).json({ res: 'Reserva eliminada correctamente' });
	} catch (error) {
		res.status(404).json({ res: 'La reserva solicitada no existe' });
	}
};
