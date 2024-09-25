import { Request, Response } from "express";
import { hashPassword } from "../helpers/auth";
import jwt from "jsonwebtoken";
import { prisma } from "../utils/prisma";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!email || !password || password !== confirmPassword) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      user: {
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};