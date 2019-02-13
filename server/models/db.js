import { connect, connection } from 'mongoose'
import './location'
import './equipment'

connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true
  }
)
const db = connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

export default db
