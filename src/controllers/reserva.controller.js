import prisma from "../database.js";

export const registrarReserva = async (req, res) => {
	if (Object.values(req.body).includes(""))
		return res.status(400).json({ res: "Todos los campos son requeridos" });

	req.body.id_conferencista = +req.body.id_conferencista;
	req.body.id_auditorio = +req.body.id_auditorio;

	const reserva = await prisma.reserva.create({
		data: req.body,
	});

	res.status(201).json({ res: "Reserva registrada correctamente", reserva });
};

export const obtenerReservas = async (_, res) => {
	res.status(200).json(await prisma.reserva.findMany());
};

export const obtenerReservaPorId = async (req, res) => {
	const reserva = await prisma.reserva.findUnique({
		where: { id: +req.params.id },
		include: {
			conferencista: true,
			auditorio: true,
		}
	});

	if (!reserva)
		return res.status(404).json({ res: "La reserva solicitada no existe" });

	res.status(200).json(reserva);
};

export const actualizarReserva = async (req, res) => {
	try {
		const reserva = await prisma.reserva.update({
			where: { id: +req.params.id },
			data: req.body,
		});

		res.status(200).json({
			res: "Reserva actualizada correctamente",
			reserva,
		});
	} catch (error) {
		res.status(404).json({ res: "La reserva solicitada no existe" });
	}
};

export const eliminarReserva = async (req, res) => {
	try {
		await prisma.reserva.delete({
			where: { id: +req.params.id },
		});

		res.status(200).json({ res: "Reserva eliminada correctamente" });
	} catch (error) {
		res.status(404).json({ res: "La reserva solicitada no existe" });
	}
};
