import { Router } from 'express'
import {
  create,
  getAll,
  getBySSN,
  deleteJobSeeker,
  getByID,
  assignJobSeekerToJob,
  getJobSeekersByJobID
} from '../controllers/jobSeekers'

const router = Router()

router.delete('/jobseeker/:id', deleteJobSeeker)
router.post('/jobseeker', create)
router.get('/', getAll)
router.get('/SSN', getBySSN)
router.get('/jobseeker/:id', getByID)
router.get('/jobseeker/:jobSeekerID/job/:jobID', assignJobSeekerToJob)
router.get('/job/:id', getJobSeekersByJobID)

export default router
