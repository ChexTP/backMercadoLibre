import {Router} from 'express'
import uploads from '../lib/multerConfig.js'
import {
    createProduct,
    getAllProducts,
    getProductByUser,
    buyProduct,
    getProductsByCategory,
    updateProductById,
    deleteProductById
} from '../controllers/product.controller.js'


const router = Router()

router.post('/createProduct',uploads.single('image'),createProduct)
router.get('/getAllProducts',getAllProducts)
router.get('/getProductByUser',getProductByUser)
router.get('/getProductsByCategory',getProductsByCategory)
router.put('/buyProduct',buyProduct)
router.put('/updateProductById',uploads.single('image'),updateProductById)
router.delete('/deleteProductById',deleteProductById)

export default router