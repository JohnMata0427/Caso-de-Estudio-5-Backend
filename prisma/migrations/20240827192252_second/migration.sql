-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('Masculino', 'Femenino');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conferencista" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "cedula" VARCHAR(10) NOT NULL,
    "genero" "Genero" NOT NULL,
    "ciudad" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "fecha_nacimiento" DATE NOT NULL,
    "telefono" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,

    CONSTRAINT "Conferencista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auditorio" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Auditorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserva" (
    "id" SERIAL NOT NULL,
    "codigo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "id_conferencista" INTEGER NOT NULL,
    "id_auditorio" INTEGER NOT NULL,

    CONSTRAINT "Reserva_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Conferencista_cedula_key" ON "Conferencista"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "Conferencista_telefono_key" ON "Conferencista"("telefono");

-- CreateIndex
CREATE UNIQUE INDEX "Conferencista_email_key" ON "Conferencista"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Auditorio_codigo_key" ON "Auditorio"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Reserva_codigo_key" ON "Reserva"("codigo");

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_id_conferencista_fkey" FOREIGN KEY ("id_conferencista") REFERENCES "Conferencista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reserva" ADD CONSTRAINT "Reserva_id_auditorio_fkey" FOREIGN KEY ("id_auditorio") REFERENCES "Auditorio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
