import { Schema, model } from 'mongoose'

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
    unique: true,
    validate: {
      validator: function(v) {
        return /\d{9}/.test(v)
      },
      message: props => `${props.value} is not a valid Social Security Number!`
    }
  },
  ssnString: {
    type: String,
    required: false,
    trim: true
  },
  birthday: {
    type: Date,
    required: true
  }
})

userSchema.pre('save', async function(next) {
  if (this.isModified('ssn') || this.isNew) {
    this.ssnString = this.ssn.toString().slice(-4)
  } else {
    return next()
  }
})

let User = model('User', userSchema)

export default User
