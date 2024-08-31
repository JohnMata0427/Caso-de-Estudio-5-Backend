import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import usuarioRoutes from "./routers/usuario.routes.js";
import auditorioRoutes from "./routers/auditorio.routes.js";
import conferencistaRoutes from "./routers/conferencista.routes.js";
import reservaRoutes from "./routers/reserva.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.set("port", process.env.PORT || 3001);

app.get("/", (_, res) => {
	res.status(200).json({ res: "El servidor está funcionando correctamente" });
});

app.use("/api", usuarioRoutes);
app.use("/api", auditorioRoutes);
app.use("/api", conferencistaRoutes);
app.use("/api", reservaRoutes);

app.use((_, res) => {
	res.status(404).json({ res: "La ruta solicitada no existe" });
});

export default app;
