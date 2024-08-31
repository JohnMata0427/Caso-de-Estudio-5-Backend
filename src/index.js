import app from "./server.js";

const port = app.get("port");

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));