import { Schema, model } from 'mongoose'

const jobSeekerSchema = new Schema({
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
  },
  currentJob: {
    type: Schema.Types.ObjectId,
    ref: 'Job',
    set: function(currentJob) {
      this._previousJob = this.currentJob
      return currentJob
    }
  },
  pastJobs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Job'
    }
  ]
})

jobSeekerSchema.pre('save', async function(next) {
  if (this.isModified('ssn') || this.isNew) {
    this.ssnString = this.ssn.toString().slice(-4)
  }
  if (this.isModified('currentJob') || this.isNew) {
    this.pastJobs = [...this.pastJobs, this._previousJob]
  }
  return next()
})

let JobSeeker = model('JobSeeker', jobSeekerSchema)

export default JobSeeker
