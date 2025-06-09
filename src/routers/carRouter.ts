import express from 'express'
import { createCar, deleteCar, getAllCars, getCarById, updateCar, } from '../controllers/carController'
import { verifyAddCar, verifyEditCar } from "../middleware/carValidation"
import uploadFile from "../middleware/profilUpload"
import { verifyToken, verifyRole } from "../middleware/authorization"

// import { authorize } from '../controllers/auth_controller.js'
// import { IsAdmin } from '../middleware/role_validation.js'

const app = express.Router()

app.get('/getAll', [verifyToken, verifyRole(["MANAGER"])], getAllCars)
app.get('/getBy/:id', getCarById)
app.post('/add', [uploadFile.single("picture"), verifyAddCar], createCar)
app.put('/update/:id', [verifyToken, verifyRole(["MANAGER"]), uploadFile.single("picture"), verifyEditCar], updateCar)
app.delete('/delete/:id', [verifyToken, verifyRole(["MANAGER"])], deleteCar)

export default app
