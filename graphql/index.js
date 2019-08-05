import {} from 'dotenv/config'
import express, { static as ExpressStatic } from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { join } from 'path'
import schema from './schemas'
import resolvers from './resolvers'
import db from './models/db'

const app = express()

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
})

server.applyMiddleware({
  app,
  path: '/graphql',
  db
})

app.use(ExpressStatic(join(__dirname, '../client/build/')))
app.get('/*', (req, res) =>
  res.sendFile(join(__dirname, '../client/build/index.html'))
)

app.listen(
  {
    port: 8000
  },
  () => {
    console.log(`Apollo Server on http://localhost:8000${server.graphqlPath}`)
  }
)
