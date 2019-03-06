import { Router } from 'express'
import { create, getAll } from '../controllers/locations'

const router = Router()

router.post('/location', create)
router.get('/', getAll)

export default router
