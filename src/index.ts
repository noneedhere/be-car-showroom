import express from 'express'
import cors from 'cors'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import dotenv from 'dotenv'

dotenv.config()
import UserRoute from './routers/userRouter'
import CarRoute from './routers/carRouter'
import SaleRoute from './routers/saleRouter'
import ReportRoute from './routers/reportRouter'

import { PORT } from './global'
import path from 'path'

const app = express()
app.use(cors())
app.use(express.json())


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Ordering System API',
            version: '1.0.0',
            description: 'API documentation for the ordering system',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: { // Nama skema keamanan
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Format token
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routers/*.ts'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(`/user`, UserRoute)
app.use(`/car`, CarRoute)
app.use(`/sale`, SaleRoute)
app.use(`/report`, ReportRoute)



// Set public folder as static
app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(process.env.PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
})