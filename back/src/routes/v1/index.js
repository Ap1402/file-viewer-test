import { Router } from 'express'
import { getFileData } from '../../controllers/data-controller.js'

const router = Router()

router.get('/files/data', getFileData)

export default router
