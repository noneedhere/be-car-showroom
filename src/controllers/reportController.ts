import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ errorFormat: "pretty" });

export const getDashboard = async (request: Request, response: Response) => {
    try {
        const allUsers = await prisma.user.count();
        const allCars = await prisma.car.count();
        const allSales = await prisma.sale.count();

        return response.status(200).json({
            status: true,
            data: {
                allUser: allUsers,
                allCars: allCars,
                totalSales: allSales
            },
            message: "Dashboard data has been retrieved successfully"
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: `There is an error. ${error}`
        });
    }
}