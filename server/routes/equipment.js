import { Router } from 'express'
import { create, getAll } from '../controllers/equipment'

const router = Router()

router.post('/equipment', create)
router.get('/', getAll)

export default router
