import { Router } from 'express'
import {
  create,
  getAll,
  getBySSN,
  deleteJobSeeker
} from '../controllers/jobSeekers'

const router = Router()

router.delete('/jobseeker/:id', deleteJobSeeker)
router.post('/jobseeker', create)
router.get('/', getAll)
router.get('/SSN', getBySSN)

export default router
