import prisma from "../database.js";

export const registrarAuditorio = async (req, res) => {
	if (Object.values(req.body).includes(""))
		return res.status(400).json({ res: "Todos los campos son requeridos" });

	req.body.capacidad = +req.body.capacidad;

	const auditorio = await prisma.auditorio.create({
		data: req.body,
	});

	res.status(201).json({
		res: "Auditorio registrado correctamente",
		auditorio,
	});
};

export const obtenerAuditorios = async (_, res) => {
	res.status(200).json(await prisma.auditorio.findMany());
};

export const obtenerAuditorioPorId = async (req, res) => {
	const auditorio = await prisma.auditorio.findUnique({
		where: { id: +req.params.id },
		include: {
			Reserva: true,
		},
	});

	if (!auditorio)
		return res
			.status(404)
			.json({ res: "El auditorio solicitado no existe" });

	res.status(200).json(auditorio);
};

export const actualizarAuditorio = async (req, res) => {
	try {
		const auditorio = await prisma.auditorio.update({
			where: { id: +req.params.id },
			data: req.body,
		});

		res.status(200).json({
			res: "Auditorio actualizado correctamente",
			auditorio,
		});
	} catch (error) {
		res.status(404).json({ res: "El auditorio solicitado no existe" });
	}
};

export const eliminarAuditorio = async (req, res) => {
	try {
		await prisma.auditorio.delete({
			where: { id: +req.params.id },
		});

		res.status(200).json({ res: "Auditorio eliminado correctamente" });
	} catch (error) {
		res.status(404).json({ res: "El auditorio solicitado no existe" });
	}
};
