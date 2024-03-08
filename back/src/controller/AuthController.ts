import { prisma } from "../utils/prisma";
var bcrypt = require('bcryptjs');
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.usuarios.findUnique({ where: { email } });

    if (!user) {
      return res.json({ error: "user not found" });
    }

      const passHash = bcrypt.hashSync(password, bcrypt.genSaltSync())

      const isPasswordValid = await bcrypt.compareSync(password, user.senha)

    if (!isPasswordValid) {
      return res.json({ error: "password invalid" });
    }

    const token = sign({ id: user.id }, "secret", { expiresIn: "1h" });

    const { id } = user;

    return res.json({ user: { id, email }, token });
  }
}
