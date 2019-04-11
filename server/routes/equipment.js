import { Router } from 'express'
import { create, deleteById, getAll } from '../controllers/equipment'

const router = Router()

router.post('/equipment', create)
router.delete('/equipment/:id', deleteById)
router.get('/', getAll)

export default router
