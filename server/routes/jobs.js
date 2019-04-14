import { Router } from 'express'
import { create, deleteById, getAll, getByID } from '../controllers/jobs'

const router = Router()

router.post('/job', create)
router.delete('/job/:id', deleteById)
router.get('/', getAll)
router.get('/job/:id', getByID)

export default router
