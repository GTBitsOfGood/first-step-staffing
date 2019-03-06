import {
  Schema,
  model
} from 'mongoose'

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  ssn: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{4}/.test(v)
      },
      message: props => `${props.value} is not a valid Social Security Number!`
    }
  },
  birthday: {
    type: Date,
    required: true
  }
})

let User = model('User', userSchema)

export default User
