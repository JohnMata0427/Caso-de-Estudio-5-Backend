import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("Conexión a la base de datos establecida");

export default prisma;
