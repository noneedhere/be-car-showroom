import express from 'express'
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from '../controllers/userController'

// import { authorize } from '../controllers/auth_controller.js'
// import { IsAdmin } from '../middleware/role_validation.js'

const app = express.Router()

app.get('/getAll', getAllUsers)
app.get('/getBy/:id', getUserById)
app.post('/add', createUser)
app.put('/update/:id', updateUser)
app.delete('/delete/:id', deleteUser)
// app.post('/login')

export default app
