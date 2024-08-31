import prisma from "../database.js";

export const registrarConferencista = async (req, res) => {
	if (Object.values(req.body).includes(""))
		return res.status(400).json({ res: "Todos los campos son requeridos" });

	req.body.fecha_nacimiento = new Date(req.body.fecha_nacimiento);

	await prisma.conferencista.create({
		data: req.body,
	});

	res.status(201).json({ res: "Conferencista registrado correctamente" });
};

export const obtenerConferencistas = async (_, res) => {
	res.status(200).json(await prisma.conferencista.findMany());
};

export const obtenerConferencistaPorId = async (req, res) => {
	const conferencista = await prisma.conferencista.findUnique({
		where: { id: +req.params.id },
		include: {
			Reserva: true,
		},
	});

	if (!conferencista)
		return res
			.status(404)
			.json({ res: "El conferencista solicitado no existe" });

	res.status(200).json(conferencista);
};

export const actualizarConferencista = async (req, res) => {
	try {
		if (req.body.fecha_nacimiento) req.body.fecha_nacimiento = new Date(req.body.fecha_nacimiento);
		await prisma.conferencista.update({
			where: { id: +req.params.id },
			data: req.body,
		});

		res.status(200).json({
			res: "Conferencista actualizado correctamente",
		});
	} catch (error) {
		res.status(404).json({ res: "El conferencista solicitado no existe" });
	}
};

export const eliminarConferencista = async (req, res) => {
	try {
		await prisma.conferencista.delete({
			where: { id: +req.params.id },
		});

		res.status(200).json({ res: "Conferencista eliminado correctamente" });
	} catch (error) {
		console.log(error);
		res.status(404).json({ res: "El conferencista solicitado no existe" });
	}
};
