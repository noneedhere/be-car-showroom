import express from 'express'
import uploadFile from '../middlewares/carUpload'
import { createCar, deleteCar, getAllCars, getCarById, updateCar } from '../controllers/carController'
// import { verifyAddCar, verifyEditCar } from '../middlewares/carValidation' // bisa tambahkan lagi kalau perlu

const app = express.Router()

app.use(express.json())

app.get('/', getAllCars)
app.get('/getBy/:id', getCarById)
app.post('/add', uploadFile.single("file"), createCar)
app.put('/update/:id', uploadFile.single("file"), updateCar)
app.delete('/delete/:id', deleteCar)

export default app
