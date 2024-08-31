import jwt from "jsonwebtoken";
import prisma from "../database.js";

export const validarUsuario = async (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization)
		return res.status(401).json({ res: "No se proporcionó un token" });

	try {
		const { id } = jwt.verify(
			authorization.split(" ")[1],
			process.env.JWT_SECRET
		);
		req.usuarioBDD = await prisma.usuario.findUnique({ where: { id } });
		next();
	} catch (error) {
		console.log(error); // <-- Para el desarrollador
		res.status(401).json({ res: "El token proporcionado no es válido" });
	}
};
