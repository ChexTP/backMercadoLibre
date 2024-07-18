import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname} from 'path'

import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import productRoutes from './routes/product.routes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app=express()

app.use(cors({
    origin: '*',
    credentials: true,
}))
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/product',productRoutes)


export default app

