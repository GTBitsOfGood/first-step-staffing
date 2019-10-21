import {} from 'dotenv/config'
import '@babel/polyfill'
import './models/db'

import express, { json, urlencoded, static as ExpressStatic } from 'express'
import { join } from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index'
import locationRouter from './routes/locations'
import equipmentRouter from './routes/equipment'
import jobSeekerRouter from './routes/jobSeekers'
import jobRouter from './routes/jobs'

let path = ''

<<<<<<< HEAD
=======
// this should be doable in webpack, this shouldn't have to be done here
>>>>>>> 2739759ea38f095a94ad050b06d45cd756692332
if (process.env.NODE_ENV == 'production') {
  path += '../../'
} else {
  path += '../'
}

const app = express()

app.use(logger('dev'))
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(ExpressStatic(join(__dirname, path + 'client/build/')))

app.use('/', indexRouter)
app.use('/locations', locationRouter)
app.use('/jobseekers', jobSeekerRouter)
app.use('/equipment', equipmentRouter)
app.use('/jobs', jobRouter)

app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, path + 'client/build/index.html'))
})

module.exports = app
