import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) throw new Error('Falha na autenticação');
    jwt.verify(token, process.env.JWT_SECRET!);

    next();
  } catch (error) {
    res.status(401).json({ message: `Token inválido. ${error}` });
  }
}
