import express from 'express'
import { authentication, createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController'
import { verifyAddUser, verifyEditUser, verifyAuthentication } from "../middlewares/userValidation"
import uploadFile from '../middlewares/profileUpload'
import { verifyToken, verifyRole } from "../middlewares/authorization"

// import { authorize } from '../controllers/auth_controller.js'
// import { IsAdmin } from '../middleware/role_validation.js'

const app = express.Router()
app.use(express.json())
app.use((req, res, next) => {
  console.log("Incoming request headers:", req.headers["content-type"]);
  next();
});

app.get(`/`, [verifyToken, verifyRole(["MANAGER"])], getAllUsers)
app.get(`/profile`, [verifyToken, verifyRole(["SALES", "MANAGER"])], getUserById)
app.post(`/`, [uploadFile.single("picture"), verifyAddUser], createUser)
app.put('/update/:id', updateUser)
app.delete('/delete/:id', deleteUser)
app.post('/login', [verifyAuthentication], authentication)
  
export default app
