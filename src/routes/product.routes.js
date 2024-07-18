import {Router} from 'express'
import {createProduct} from '../controllers/product.controller.js'
import uploads from '../lib/multerConfig.js'

const router = Router()

router.post('/createProduct',uploads.single('image'),createProduct)

export default router