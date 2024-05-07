import { prisma } from "../utils/prisma";
var bcrypt = require('bcryptjs');
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";

export class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await prisma.usuarios.findUnique({ where: { email } })

    if (!user)  return res.json({ error: "user not found" })

    console.log(user)

    const isPasswordValid = await bcrypt.compareSync(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credencial" });
    }
    const token = sign({ id: user.id }, "secret", { expiresIn: "1h" });

    const { id } = user;

    return res.status(200).json({ user: { user }, token });

  }
}
