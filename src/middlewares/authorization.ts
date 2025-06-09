import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET } from "../global";

interface JwtPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Extend Request interface supaya TS gak error
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const secretKey = SECRET || "";
    const decoded = verify(token, secretKey) as JwtPayload;
    req.user = decoded;  // Simpan di req.user, bukan req.body.user
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export const verifyRole = (allowedRole: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(403).json({ message: 'No user information available.' });
    }

    if (!allowedRole.includes(user.role)) {
      return res.status(403).json({ message: `Access denied. Requires one of the following roles: ${allowedRole.join(', ')}` });
    }

    next();
  };
};
