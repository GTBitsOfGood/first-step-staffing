import { Router } from 'express'
import { create, getAll } from '../controllers/jobs'

const router = Router()

router.post('/job', create)
router.get('/', getAll)

export default router
