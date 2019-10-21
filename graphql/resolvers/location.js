import Location from '../models/location'

const locationResolvers = {
  Query: {
    getAllLocations: async () => {
      return await Location.find()
    },
    getLocationById: async (parent, { id }) => {
      return await Location.findById(id)
    }
  },
  Mutation: {
    createLocation: async (
      parent,
      { streetNumber, streetName, city, state }
    ) => {
      const location = {
        streetNumber,
        streetName,
        city,
        state
      }
      return await Location.create(location)
    },
    deleteLocationById: async (parent, { id }) => Location.findById(id)
  }
}

export default locationResolvers
