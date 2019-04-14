import { Schema, model } from 'mongoose'

const JobSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    upperCase: true
  },
  address: {
    type: String,
    required: true,
    trim: true,
    upperCase: true
  },
  fssLocation: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
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
