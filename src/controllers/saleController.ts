import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllSales = async (request: Request, response: Response) => {
    try {
        const { search } = request.query

        const allSales = await prisma.sale.findMany({
            where: {
                OR: [
                    { buyerName: { contains: search?.toString() || "" } },
                    { car: { name: { contains: search?.toString() || "" } } }
                ]
            },
            orderBy: { saleDate: "desc" },
            include: {
                car: true,
                user: true
            }
        })

        return response.status(200).json({
            status: true,
            data: allSales,
            message: `Sale list has been retrieved`
        })
    } catch (error) {
        return response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        })
    }
}

export const createSale = async (request: Request, response: Response) => {
    try {
        const { buyerName, carId } = request.body
        const user = request.body.user

        const findCar = await prisma.car.findUnique({
            where: { id_car: Number(carId) }
        })

        if (!findCar) {
            return response.status(404).json({
                status: false,
                message: `Car with id ${carId} is not found`
            })
        }

        const newSale = await prisma.sale.create({
            data: {
                uuid: uuidv4(),
                buyerName,
                carId: Number(carId),
                userId: Number(user.id),
            }
        })

        return response.status(200).json({
            status: true,
            data: newSale,
            message: `New Sale has been created`
        })
    } catch (error) {
        return response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        })
    }
}

export const updateSale = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const { buyerName, carId, price } = request.body
        const user = request.body.user

        const findSale = await prisma.sale.findUnique({
            where: { id_sale: Number(id) }
        })

        if (!findSale) {
            return response.status(404).json({
                status: false,
                message: `Sale is not found`
            })
        }

        const updatedSale = await prisma.sale.update({
            where: { id_sale: Number(id) },
            data: {
                buyerName: buyerName || findSale.buyerName,
                carId: carId ? Number(carId) : findSale.carId,
                userId: user?.id || findSale.userId,
            }
        })

        return response.status(200).json({
            status: true,
            data: updatedSale,
            message: `Sale has been updated`
        })
    } catch (error) {
        return response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        })
    }
}

export const deleteSale = async (request: Request, response: Response) => {
    try {
        const { id } = request.params

        const findSale = await prisma.sale.findUnique({
            where: { id_sale: Number(id) }
        })

        if (!findSale) {
            return response.status(404).json({
                status: false,
                message: `Sale is not found`
            })
        }

        const deletedSale = await prisma.sale.delete({
            where: { id_sale: Number(id) }
        })

        return response.status(200).json({
            status: true,
            data: deletedSale,
            message: `Sale has been deleted`
        })
    } catch (error) {
        return response.status(400).json({
            status: false,
            message: `There is an error. ${error}`
        })
    }
}
