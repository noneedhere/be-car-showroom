import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { BASE_URL, SECRET } from "../global";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllCars = async (request: Request, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { search } = request.query

        /** process to get car, contains means search name of car based on sent keyword */
        const allCar = await prisma.car.findMany({
            where: { name: { contains: search?.toString() || "" } }
        })

        return response.json({
            status: true,
            data: allCar,
            message: `car has retrieved`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const getCarById = async (request: Request, response: Response) => {
    try {
        const { id } = request.params; // Ambil ID dari parameter URL

        if (!id) {
            return response.status(400).json({
                status: false,
                message: `Car ID is required`
            });
        }

        const car = await prisma.car.findFirst({
            where: { id_car: Number(id) }
        });

        if (!car) {
            return response.status(404).json({
                status: false,
                message: `Car not found`
            });
        }

        return response.status(200).json({
            status: true,
            data: car,
            message: `Car has been retrieved`
        });
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: `There is an error. ${error}`
        });
    }
}

export const createCar = async (request: any, response: Response) => {
    try {
        /** get requested data (data has been sent from request) */
        const { name, price, category, year, description } = request.body
        const uuid = uuidv4()

        /** variable filename use to define of uploaded file name */
        let filename = ""
        if (request.file) filename = request.file.filename /** get file name of uploaded file */

        /** process to save new car */
        const newcar = await prisma.car.create({
            data: { uuid, name, price: Number(price), category, year: Number(year), description, image: filename }
        })

        return response.json({
            status: true,
            data: newcar,
            message: `New car has created`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const updateCar = async (request: any, response: Response) => {
    try {
        /** get id of car's id that sent in parameter of URL */
        const { id } = request.params
        /** get requested data (data has been sent from request) */
        const { name, price, category, year, description } = request.body

        /** make sure that data is exists in database */
        const findCar = await prisma.car.findFirst({ where: { id_car: Number(id) } })
        if (!findCar) return response
            .status(200)
            .json({ status: false, message: `car is not found` })

        /** default value filename of saved data */
        let filename = findCar.image
        if (request.file) {
            /** update filename by new uploaded picture */
            filename = request.file.filename
            /** check the old picture in the folder */
            let path = `${BASE_URL}/../public/profile_picture/${findCar.image}`
            let exists = fs.existsSync(path)
            /** delete the old exists picture if reupload new file */
            if(exists && findCar.image !== ``) fs.unlinkSync(path)
        }

        /** process to update car's data */
        const updatedCar = await prisma.car.update({
            data: {
                name: name || findCar.name,
                price: price ? Number(price) : findCar.price,
                category: category || findCar.category,
                year: year ? Number(year) : findCar.year,
                description: description || findCar.description,
                image: filename
            },
            where: { id_car: Number(id) }
        })

        return response.json({
            status: true,
            data: updatedCar,
            message: `car has updated`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const deleteCar = async (request: any, response: Response) => {
    try {
        /** get id of car's id that sent in parameter of URL */
        const { id } = request.params
        /** make sure that data is exists in database */
        const findCar = await prisma.car.findFirst({ where: { id_car: Number(id) } })
        if (!findCar) return response
            .status(200)
            .json({ status: false, message: `car is not found` })

        /** prepare to delete file of deleted car's data */
        let path = `${BASE_URL}/public/profile_picture/${findCar.image}` /** define path (address) of file location */
        let exists = fs.existsSync(path)
        if (exists && findCar.image !== ``) fs.unlinkSync(path) /** if file exist, then will be delete */

        /** process to delete car's data */
        const deletedCar = await prisma.car.delete({
            where: { id_car: Number(id) }
        })
        return response.json({
            status: true,
            data: deletedCar,
            message: `car has deleted`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}
