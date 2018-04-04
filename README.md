<div align="center"><strong>N</strong>ode <strong>A</strong>pollo <strong>P</strong>risma <strong>E</strong>xpress <strong>R</strong>eact <strong>G</strong>raphQL
</div>
  
<h1 align="center"><strong>Boilerplate for a Fullstack GraphQL App with React</strong></h1>
<h3 align="center">Authentification with permissions & roles. Backend & Frontend</h3>
<h3 align="center">Upload image with expressJs</h3>
<br />

![](https://imgur.com/ousyQaC.png)

<div align="center"><strong>🚀 Bootstrap your fullstack GraphQL app within seconds</strong></div>
<div align="center">Basic starter kit for a fullstack GraphQL app with React and Node.js - based on best practices from the GraphQL community.</div>



## Getting started
1/ Install docker and Prisma cli. (https://www.prismagraphql.com/docs/quickstart/backend/node/node-phe8vai1oo)


2/ In 3 different terminals:


```sh
# Prisma: Graphql and mySql (port 4000)
cd server
yarn install
yarn start
```

```sh
# Backend: ExpressJs (port 8000)
cd express
yarn install
yarn start
```

```sh
# Front: ReactJs (port 3000)
cd react
yarn install
yarn start
```

Go to url: http://localhost:3000



## Authentification

![](https://user-images.githubusercontent.com/15246526/36926055-a122e268-1e2a-11e8-8f68-b338d0d84dff.png)




|   |  |
| ------------- | ------------- |
| Content Cell  | ![](https://user-images.githubusercontent.com/15246526/36926055-a122e268-1e2a-11e8-8f68-b338d0d84dff.png)  |
| Content Cell  | ![](https://user-images.githubusercontent.com/15246526/36925970-4315cf46-1e2a-11e8-8548-10f9b65d6387.png)  |
More details in the tuto: https://github.com/graphcool/prisma/tree/master/examples/auth

## Upload File
![](https://user-images.githubusercontent.com/15246526/36926072-b97b3964-1e2a-11e8-8bee-41ab6769a19f.png)
![](https://user-images.githubusercontent.com/15246526/36926125-f1130e2e-1e2a-11e8-928c-4a2c1f1c136b.png)
Files are uploaded thanks to an ExpressJs server.


## Pagination - search - orderBy
![](https://user-images.githubusercontent.com/15246526/38333662-186973f8-380e-11e8-9289-f6240ffc5a6c.png)

## Features

- **Scalable GraphQL server:** The server uses [`graphql-yoga`](https://github.com/prisma/graphql-yoga) which is based on Apollo Server & Express
- **Pre-configured Apollo Client:** The project comes with a preconfigured setup for Apollo Client
- **GraphQL database:** Includes GraphQL database binding to [Prisma](https://www.prismagraphql.com) (running on MySQL)
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground) & [query performance tracing](https://github.com/apollographql/apollo-tracing)
- **Extensible**: Simple and flexible [data model](./database/datamodel.graphql) – easy to adjust and extend
- **No configuration overhead**: Preconfigured [`graphql-config`](https://github.com/prisma/graphql-config) setup

For a fully-fledged **React & Apollo tutorial**, visit [How to GraphQL](https://www.howtographql.com/react-apollo/0-introduction/). You can more learn about the idea behind GraphQL boilerplates [here](https://blog.graph.cool/graphql-boilerplates-graphql-create-how-to-setup-a-graphql-project-6428be2f3a5).

## Requirements

You need to have the [GraphQL CLI](https://github.com/graphql-cli/graphql-cli) installed to bootstrap your GraphQL server using `graphql create`:

```sh
npm install -g graphql-cli
```




## Documentation

### Commands


* `prisma local nuke`
* `prisma reset`
* `prisma local start` to start your local Prisma cluster.

* `yarn start` starts GraphQL server on `http://localhost:4000`
* `yarn dev` starts GraphQL server on `http://localhost:4000` _and_ opens GraphQL Playground
* `yarn playground` opens the GraphQL Playground for the `projects` from [`.graphqlconfig.yml`](./.graphqlconfig.yml)
* `yarn prisma <subcommand>` gives access to local version of Prisma CLI (e.g. `yarn prisma deploy`)

> **Note**: We recommend that you're using `yarn dev` during development as it will give you access to the GraphQL API or your server (defined by the [application schema](./src/schema.graphql)) as well as to the Prisma API directly (defined by the [Prisma database schema](./generated/prisma.graphql)). If you're starting the server with `yarn start`, you'll only be able to access the API of the application schema.







## Contributing


Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions or want to contribute yourself, don't hesitate!
# prisma
