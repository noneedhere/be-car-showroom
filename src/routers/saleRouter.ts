import express from "express"
import { getAllSales, createSale, updateSale, deleteSale } from "../controllers/saleController"
// import { verifyAddOrder, verifyEditStatus } from "../middlewares/orderValidation"
// import { verifyRole, verifyToken } from "../middlewares/authorization"

const app = express()
app.use(express.json())

app.get(`/getAll`, getAllSales)
app.post(`/add`, createSale)
app.put(`/update/:id`, updateSale)
app.delete(`/delete/:id`, deleteSale)

// app.get(`/`, [verifyToken, verifyRole(["CASHIER", "MANAGER"])], getAllOrders)
// app.post(`/`, [verifyToken, verifyRole(["CASHIER"]), verifyAddOrder], createOrder)
// app.put(`/:id`, [verifyToken, verifyRole(["MANAGER"]), verifyEditStatus], updateStatusOrder)
// app.delete(`/:id`, [verifyToken, verifyRole(["MANAGER"])], deleteOrder)

export default app