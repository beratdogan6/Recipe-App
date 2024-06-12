import express from 'express'
import { login, register, getUser } from '../controllers/auth.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/user/:id', getUser)

export default router