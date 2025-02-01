import express from 'express';
import cors from 'cors';
import usuarioRoutes from './routers/usuario.routes.js';
import auditorioRoutes from './routers/auditorio.routes.js';
import conferencistaRoutes from './routers/conferencista.routes.js';
import reservaRoutes from './routers/reserva.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
	res.status(200).json({ res: 'El servidor está funcionando correctamente 🚀' });
});

app.use('/api', [
	usuarioRoutes,
	auditorioRoutes,
	conferencistaRoutes,
	reservaRoutes,
]);

app.use((_, res) => {
	res.status(404).json({ res: 'La ruta solicitada no existe' });
});

export { app };
