import express from 'express'
import { createUser, deleteUser, getAllUsers, getUserById, changePicture, authentication, updateUser } from '../controllers/userController'
import { verifyAddUser, verifyEditUser, verifyAuthentication } from "../middleware/userValidation"
import uploadFile from "../middleware/profilUpload"
import { verifyToken, verifyRole } from "../middleware/authorization"

// import { authorize } from '../controllers/auth_controller.js'
// import { IsAdmin } from '../middleware/role_validation.js'

const app = express.Router()
app.use(express.json())

app.get(`/getAll`, [verifyToken], getAllUsers)
app.get('/getBy/:id', getUserById)
app.post('/add', [uploadFile.single("picture"), verifyAddUser], createUser)
app.put(`/:id`, [verifyToken, verifyRole(["CASHIER", "MANAGER"]), uploadFile.single("picture"), verifyEditUser], updateUser)
app.put(`/profile/:id`, [verifyToken, verifyRole(["CASHIER", "MANAGER"]), uploadFile.single("picture")], changePicture)
app.delete(`/:id`, [verifyToken, verifyRole(["MANAGER"])], deleteUser)
app.post(`/login`, [verifyAuthentication], authentication)
// app.post('/login')

export default app
