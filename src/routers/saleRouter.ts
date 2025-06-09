import express from "express"
import multer from "multer"
import { getAllSales, createSale, updateSale, deleteSale } from "../controllers/saleController"

const router = express.Router()

// Middleware multer (tanpa file upload, tapi tetap bisa parsing form-data)
const upload = multer()

router.use(express.json())

router.get(`/getAll`, getAllSales)

// Gunakan multer middleware untuk parsing form-data
router.post(`/add`, upload.none(), createSale)
router.put(`/update/:id`, upload.none(), updateSale)
router.delete(`/delete/:id`, deleteSale)

export default router
