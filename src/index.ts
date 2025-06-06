import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()
// import MenuRoute from './routers/menuRoute'
// import UserRoute from './routers/userRoute'
// import OrderRoute from './routers/orderRoute'
// import ReportRoute from './routers/reportRoute'

import UserRoute from './routers/userRouter'
import CarRoute from './routers/carRouter'
import SaleRoute from './routers/saleRouter'
import ReportRoute from './routers/reportRouter'    

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(`/user`, UserRoute)
app.use(`/car`, CarRoute)
app.use(`/sale`, SaleRoute)
app.use(`/report`, ReportRoute)



// Set public folder as static
// app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(process.env.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
})