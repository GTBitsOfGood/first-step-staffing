import { Schema, model } from 'mongoose'

const JobSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Location',
    required: true
  },
  peopleNeeded: {
    type: Number,
    required: true,
    trim: true
  },
  transportationType: {
    type: String,
    enum: ['Van', 'Uber'],
    required: true,
    trim: true
  },
  transportationCost: {
    type: Number,
    required: true,
    trim: true
  }
})

export default model('Job', JobSchema)
