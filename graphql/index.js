import {} from 'dotenv/config'
import express from 'express'
import {
    ApolloServer,
    gql
} from 'apollo-server-express'
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

app.listen({
    port: 8000
}, () => {
    console.log(`Apollo Server on http://localhost:8000${server.graphqlPath}`)
})
