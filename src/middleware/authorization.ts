import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { SECRET } from "../global";

// Tipe data payload token JWT
interface JwtPayload {
    id: string;
    name: string;
    email: string;
    role: string;
}

// ✅ Extend interface Request agar bisa menyimpan `user` hasil decode token
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}

// ✅ Middleware untuk verifikasi token JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Pastikan header Authorization tersedia dan diawali dengan "Bearer"
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const secretKey = SECRET || "";
        const decoded = verify(token, secretKey) as JwtPayload;
        req.user = decoded; // Simpan user hasil decode ke req.user
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token." });
    }
};

// ✅ Middleware untuk membatasi akses berdasarkan role
export const verifyRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;

        if (!user) {
            return res.status(403).json({ message: "No user information available." });
        }

        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({
                message: `Access denied. Requires one of the following roles: ${allowedRoles.join(", ")}`,
            });
        }

        next();
    };
};
