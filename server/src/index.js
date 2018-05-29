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
      debug: false
    })
  })
})

const options = {
// playground: null, // Dissable playground endpoint,
// playground: '/docs/, // Move playground to /docs/,
}

server.express.get(server.options.endpoint + 'user', (req, res, done) => {
  res.send('respond with a resource from your API REST')
})



server.start(options, () => { console.log('Server is running on http://localhost:4000') })
