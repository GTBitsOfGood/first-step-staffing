import {
  connect,
  connection
} from 'mongoose'
import './location'
import './equipment'
import './jobSeeker'
import './job'

connect(
  process.env.MONGO_URL, {
    useNewUrlParser: true
  }
)
const db = connection
console.log(connection)

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

export default db
