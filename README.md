<h1 align="center"><strong>Boilerplate for a Fullstack GraphQL App with React</strong></h1>
<h3 align="center">Authentification is ready. Backend & Frontend</h3>
<h3 align="center">Upload image with expressJs</h3>
<br />

![](https://imgur.com/ousyQaC.png)

<div align="center"><strong>🚀 Bootstrap your fullstack GraphQL app within seconds</strong></div>
<div align="center">Basic starter kit for a fullstack GraphQL app with React and Node.js - based on best practices from the GraphQL community.</div>

## login
![](https://user-images.githubusercontent.com/15246526/36925970-4315cf46-1e2a-11e8-8548-10f9b65d6387.png)
![](https://user-images.githubusercontent.com/15246526/36926055-a122e268-1e2a-11e8-8f68-b338d0d84dff.png)
More details in the tuto: https://github.com/graphcool/prisma/tree/master/examples/auth




## Upload File
![](https://user-images.githubusercontent.com/15246526/36926072-b97b3964-1e2a-11e8-8bee-41ab6769a19f.png)
![](https://user-images.githubusercontent.com/15246526/36926125-f1130e2e-1e2a-11e8-928c-4a2c1f1c136b.png)
Files are uploaded thanks to an ExpressJs server.




## Getting started

```sh
# 1. Bootstrap GraphQL server in directory `my-app`, based on `react-fullstack-basic` boilerplate
graphql create my-app --boilerplate react-fullstack-basic

# 2. When prompted, deploy the Prisma service to a _public cluster_

# 3. Navigate into the `server` directory of the new project
cd my-app/server

# 4. Start the server
yarn dev # runs server on http://localhost:4000, and opens GraphQL PLayground

# 5. Open a new tab in the terminal and navigate back into my-app;
# then run the app
cd ..
yarn start
```

in 3 different consoles:
```sh
# Front: react
cd react
yarn install
yarn start
```

```sh
# Prisma: Graphql and mySql
cd server
yarn install
yarn start
```

```sh
# Backend: ExpressJs
cd express
yarn install
yarn start
```



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

## Getting started

```sh
# 1. Bootstrap GraphQL server in directory `my-app`, based on `react-fullstack-basic` boilerplate
graphql create my-app --boilerplate react-fullstack-basic

# 2. When prompted, deploy the Prisma service to a _public cluster_

# 3. Navigate into the `server` directory of the new project
cd my-app/server

# 4. Start the server
yarn dev # runs server on http://localhost:4000, and opens GraphQL PLayground

# 5. Open a new tab in the terminal and navigate back into my-app;
# then run the app
cd ..
yarn start
```

## Documentation

### Commands

* `yarn start` starts GraphQL server on `http://localhost:4000`
* `yarn dev` starts GraphQL server on `http://localhost:4000` _and_ opens GraphQL Playground
* `yarn playground` opens the GraphQL Playground for the `projects` from [`.graphqlconfig.yml`](./.graphqlconfig.yml)
* `yarn prisma <subcommand>` gives access to local version of Prisma CLI (e.g. `yarn prisma deploy`)

> **Note**: We recommend that you're using `yarn dev` during development as it will give you access to the GraphQL API or your server (defined by the [application schema](./src/schema.graphql)) as well as to the Prisma API directly (defined by the [Prisma database schema](./generated/prisma.graphql)). If you're starting the server with `yarn start`, you'll only be able to access the API of the application schema.

### Server structure

![](https://imgur.com/95faUsa.png)

| File name 　　　　　　　　　　　　　　| Description 　　　　　　　　<br><br>|
| :--  | :--         |
| `├── .graphqlconfig.yml` | Configuration file based on [`graphql-config`](https://github.com/prisma/graphql-config) (e.g. used by GraphQL Playground).|
| `└── database ` (_directory_) | _Contains all files that are related to the Prisma database service_ |\
| `　　├── prisma.yml` | The root configuration file for your Prisma database service ([docs](https://www.prismagraphql.com/docs/reference/prisma.yml/overview-and-example-foatho8aip)) |
| `　　└── datamodel.graphql` | Defines your data model (written in [GraphQL SDL](https://blog.graph.cool/graphql-sdl-schema-definition-language-6755bcb9ce51)) |
| `└── src ` (_directory_) | _Contains the source files for your GraphQL server_ |
| `　　├── index.js` | The entry point for your GraphQL server |
| `　　├── schema.graphql` | The **application schema** defining the API exposed to client applications  |
| `　　└── generated` (_directory_) | _Contains generated files_ |
| `　　　　└── prisma.grapghql` | The **Prisma database schema** defining the Prisma GraphQL API  |

## Contributing

The GraphQL boilerplates are maintained by the GraphQL community, with official support from the [Apollo](https://dev-blog.apollodata.com) & [Graphcool](https://blog.graph.cool/) teams.

Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions or want to contribute yourself, join the [`#graphql-boilerplate`](https://graphcool.slack.com/messages/graphql-boilerplate) channel on our [Slack](https://graphcool.slack.com/).
# prisma
