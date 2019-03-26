import {} from 'dotenv/config'
import '@babel/polyfill'
import './models/db'

import express, { json, urlencoded, static as ExpressStatic } from 'express'
import { join } from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/index'
import locationRouter from './routes/locations'
import userRouter from './routes/users'
import jobRouter from './routes/jobs'

let path = ''

if (process.env.NODE_ENV == 'production') {
  path += '../../'
} else {
  path += '../'
}

const app = express()

app.use(logger('dev'))
app.use(json())
app.use(
  urlencoded({
    extended: false
  })
)
app.use(cookieParser())
app.use(ExpressStatic(join(__dirname, path + 'client/build/')))

app.use('/', indexRouter)
app.use('/locations', locationRouter)
app.use('/users', userRouter)
app.use('/jobs', jobRouter)

app.get('/*', (req, res) => {
  res.sendFile(join(__dirname, path + 'client/build/index.html'))
})

module.exports = app
