import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  ssn: Number,
  birthday: Date
})

const User = model('User', userSchema)

export default User
