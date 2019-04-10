import { Router } from 'express'
import { create, deleteById, getAll } from '../controllers/jobs'

const router = Router()

router.post('/job', create)
router.delete('/job/:id', deleteById)
router.get('/', getAll)

export default router
