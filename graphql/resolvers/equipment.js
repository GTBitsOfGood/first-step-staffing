import Equipment from '../models/equipment'

const equipmentResolvers = {
  Query: {
    getAllEquipment: async () => {
      return await Equipment.find()
    },
    getEquipmentById: async (parent, { id }) => {
      return await Equipment.findById(id)
    }
  },

  Mutation: {
    createEquipment: async (parent, { name, cost }) => {
      const equipment = {
        name,
        cost
      }
      return await Equipment.create(equipment)
    },
    deleteEquipmentById: async (parent, { id }) =>
      await Equipment.findByIdAndDelete(id)
  }
}

export default equipmentResolvers
