import { prisma } from "../utils/prisma";
import { hash } from "bcryptjs";
import { Request, Response } from "express";

export class UserController {
  async index(req: Request, res: Response) {
    const users = await prisma.usuarios.findMany();
    return res.json(users);
  }
  async store(req: Request, res: Response) {
    const { nome, email, password } = req.body;

    const userExists = await prisma.usuarios.findUnique({ where: { email } });

    if (userExists) {
      return res.json({ error: "user exists" });
    }

    const hash_password = await hash(password, 10);

    const user = await prisma.usuarios.create({
      data: {
        nome,
        email,
        senha: hash_password,
        password: hash_password,
        permissao: 0,
        matricula: 0
      },
    });
    user.senha = "";
    return res.json({ user });
  }
}
