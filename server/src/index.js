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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    message: 'Message from graphql-yoga (Express API)',
    obj: 'You can use graphql-yoga as a simple REST API'
  })
})



server.start(options, () => { console.log('Server is running on http://localhost:4000') })
