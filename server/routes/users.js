import { Router } from 'express'
import { create, getAll, getBySSN } from '../controllers/users'

const router = Router()

router.post('/', create)
router.get('/', getAll)
router.get('/SSN', getBySSN)

export default router
