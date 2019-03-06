import { Router } from 'express'
import { create, getAll, getByLastName } from '../controllers/users'

const router = Router()

router.post('/', create)
router.get('/', getAll)
router.get('/first3LettersLastName', getByLastName)

export default router
