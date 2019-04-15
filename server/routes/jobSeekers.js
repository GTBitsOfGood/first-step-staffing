import { Router } from 'express'
import {
  create,
  getAll,
  getBySSN,
  deleteJobSeeker,
  getByID
} from '../controllers/jobSeekers'

const router = Router()

router.delete('/jobseeker/:id', deleteJobSeeker)
router.post('/', create)
router.get('/', getAll)
router.get('/SSN', getBySSN)
router.get('/jobseeker/:id', getByID)

export default router
