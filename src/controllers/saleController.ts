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
                user: true,
                OrderList: true
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
        const { buyerName, car: carName, note } = request.body
        const user = request.body.user

        if (!buyerName || !carName) {
            return response.status(400).json({
                status: false,
                message: "buyerName and car (name) are required"
            })
        }

        const findCar = await prisma.car.findFirst({
            where: { name: carName }
        })

        if (!findCar) {
            return response.status(404).json({
                status: false,
                message: `Car with name ${carName} not found`
            })
        }

        const newSale = await prisma.sale.create({
            data: {
                uuid: uuidv4(),
                buyerName,
                carId: findCar.id_car,
                userId: Number(user?.id || 1),
            }
        })

        if (note) {
            await prisma.saleList.create({
                data: {
                    uuid: uuidv4(),
                    quantity: 1,
                    note,
                    carId: findCar.id_car,
                    saleId: newSale.id_sale,
                }
            })
        }

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
        const { buyerName, carId } = request.body
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
