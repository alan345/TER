const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const resolvers = require('./resolvers')

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql', // the auto-generated GraphQL schema of the Prisma API
      endpoint: process.env.PRISMA_ENDPOINT,
      // secret: process.env.PRISMA_SECRET, // only needed if specified in `database/prisma.yml`
      debug: true
    })
  })
})

const options = {
// playground: null, // Dissable playground endpoint,
// playground: '/docs/, // Move playground to /docs/,
}

server.start(options, () => { console.log('Server is running on http://localhost:4000') })
