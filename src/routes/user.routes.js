import {Router} from 'express'
import {getAllUsers,getUserById,updateUserById,deleteUserById} from '../controllers/user.controller.js'
import upload from '../lib/multerConfig.js'

const router = Router()

router.get('/users',getAllUsers)
router.get('/userById',getUserById)
router.put('/updateUserById',upload.single('image'),updateUserById)
router.delete('/deleteUserById',deleteUserById)

export default router