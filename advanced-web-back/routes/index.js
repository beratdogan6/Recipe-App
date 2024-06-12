import express from 'express'
import { index, ping } from '../controllers/index.js'

const router = express.Router()

router.get('/', index)
router.get('/ping', ping)

export default router