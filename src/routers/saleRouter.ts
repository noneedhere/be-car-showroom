import express from "express"
import { getAllSales, createSale, updateSale, deleteSale } from "../controllers/saleController"
import { verifyAddOrder, verifyEditStatus } from "../middleware/orderValidation"
import { verifyRole, verifyToken } from "../middleware/authorization"
import { create } from "domain"

const app = express()
app.use(express.json())

app.get(`/getAll`, [verifyToken, verifyRole(["CASHIER", "MANAGER"])], getAllSales)
app.post(`/`, [verifyToken, verifyRole(["SALES", "MANAGER"]), verifyAddOrder], createSale)
app.put(`/:id`, [verifyToken, verifyRole(["MANAGER"]), verifyEditStatus], updateSale)
app.delete(`/:id`, [verifyToken, verifyRole(["MANAGER"])], deleteSale)

export default app