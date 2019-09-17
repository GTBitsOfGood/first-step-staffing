import { Schema, model } from 'mongoose'

// TODO: add zipcode
const LocationSchema = Schema({
  streetNumber: {
    type: Number,
    required: true,
    trim: true
  },
  streetName: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  // consider converting to enum??
  state: {
    type: String,
    required: true,
    trim: true
  }
})

export default model('Location', LocationSchema)
