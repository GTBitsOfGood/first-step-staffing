import { Router } from 'express'
import { create, getAll } from '../controllers/users'

const router = Router()

router.post('/user', create)
router.get('/', getAll)

export default router
