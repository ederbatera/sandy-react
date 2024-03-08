-- CreateTable
CREATE TABLE "usuarios" (
  `id` int(11) NOT NULL PRIMARY KEY AUTOINCREMENT,
  `matricula` int(10) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `funcao` int(1) NOT NULL DEFAULT 0 COMMENT '0=NENHUM, 1=ENTREGADOR,2=CONTOLADOR,3=ADMINISTRADOR',
  `senha` varchar(150) NOT NULL,
  `data_cadastro` datetime NOT NULL DEFAULT current_timestamp(),
  `email` varchar(150) NOT NULL

);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "usuarios"("email");
