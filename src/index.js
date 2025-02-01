import { app } from './server.js';

const { PORT = 3001 } = process.env;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
