import express from 'express'
import { createCar, deleteCar, getAllCars, getCarById, updateCar } from '../controllers/carController'

// import { authorize } from '../controllers/auth_controller.js'
// import { IsAdmin } from '../middleware/role_validation.js'

const app = express.Router()

app.get('/getAll', getAllCars)
app.get('/getBy/:id', getCarById)
app.post('/add', createCar)
app.put('/update/:id', updateCar)
app.delete('/delete/:id', deleteCar)

export default app
