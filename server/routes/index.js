import {
  Router
} from 'express'

const router = Router()

/* GET home page. */
router.get('/', (_, res) => {
  res.send('this is an API route')
})

export default router