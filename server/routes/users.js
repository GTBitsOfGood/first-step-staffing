import { Router } from 'express'
import { create, getAll, getBySSN, deleteJobSeeker } from '../controllers/users'

const router = Router()

router.delete('/user/:id', deleteJobSeeker)
router.post('/', create)
router.get('/', getAll)
router.get('/SSN', getBySSN)

export default router
