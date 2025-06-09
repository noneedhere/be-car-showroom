import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

import UserRoute from './routers/userRouter'
import CarRoute from './routers/carRouter'
import SaleRoute from './routers/saleRouter'
import ReportRoute from './routers/reportRouter'

const app = express()

// Middleware umum
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // <--- ini udah betul, jangan hapus

// Set folder public supaya bisa akses file gambar via URL
app.use('/public', express.static(path.join(__dirname, '..', 'public'))) // <- ini aktifkan kembali

// Routes
app.use(`/user`, UserRoute)
app.use(`/car`, CarRoute)
app.use(`/sale`, SaleRoute)
app.use(`/report`, ReportRoute)

// Start server
app.listen(process.env.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`)
})
