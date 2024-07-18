import {Router} from 'express'
import {register,login,logout,verifyToken} from '../controllers/auth.controller.js'
import upload from '../lib/multerConfig.js'

const router = Router()

router.post('/register',upload.single('image'),register)
router.post('/login',login)
router.post('/logout',logout)
router.post('/verifyToken',verifyToken)

export default router