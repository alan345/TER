<div align="center"><strong>N</strong>ode <strong>A</strong>pollo <strong>P</strong>risma <strong>E</strong>xpress <strong>R</strong>eact <strong>G</strong>raphQL
</div>
  
<h1 align="center"><strong>Boilerplate for a Fullstack GraphQL App with React</strong></h1>
<h3 align="center">Authentification with permissions & roles. Backend & Frontend</h3>
<h3 align="center">Upload image with expressJs</h3>
<br />



![image](https://user-images.githubusercontent.com/15246526/38530809-7a9cc69e-3c21-11e8-8eb9-6f143eb7d64d.png)


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



## Screenshots






| Mobile Friendly  | Image |
| ------------- | ------------- |
| ![image](https://user-images.githubusercontent.com/15246526/38843172-9e8c44cc-41a2-11e8-8729-ae522bd257cb.png) | [![Demo NAPERG](https://j.gifs.com/VPk441.gif)](https://www.youtube.com/watch?v=UfeEpOWeaDQ&feature=youtu.be)  |
| Mobile Friendly 2 | Email Validation | ![image](https://user-images.githubusercontent.com/15246526/38843172-9e8c44cc-41a2-11e8-8729-ae522bd257cb.png)  | ![image](https://user-images.githubusercontent.com/15246526/38842888-58a8858e-41a1-11e8-91d0-1d5535da7e1e.png)  |
| ![image](https://user-images.githubusercontent.com/15246526/38843148-8eaa2a06-41a2-11e8-9130-d74194d39031.png)  | FORGET PASSWORD ![image](https://user-images.githubusercontent.com/15246526/38843003-f05421a4-41a1-11e8-96a8-3c442a5fd07c.png) |
| Users List | User |
|![image](https://user-images.githubusercontent.com/15246526/38844311-9df6f228-41a7-11e8-917c-1527ec90daec.png) | ![image](https://user-images.githubusercontent.com/15246526/38844346-dc22ec8c-41a7-11e8-9347-49cfc4e97424.png)
|
|Error Management||
|![image](https://user-images.githubusercontent.com/15246526/38844377-0afaaa72-41a8-11e8-9f8e-f067082365df.png)
||





## Features

- **Scalable GraphQL server:** The server uses [`graphql-yoga`](https://github.com/prisma/graphql-yoga) which is based on Apollo Server & Express
- **Pre-configured Apollo Client:** The project comes with a preconfigured setup for Apollo Client
- **GraphQL database:** Includes GraphQL database binding to [Prisma](https://www.prismagraphql.com) (running on MySQL)
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground) & [query performance tracing](https://github.com/apollographql/apollo-tracing)
- **Extensible**: Simple and flexible data model – easy to adjust and extend
- **No configuration overhead**: Preconfigured [`graphql-config`](https://github.com/prisma/graphql-config) setup

For a fully-fledged **React & Apollo tutorial**, visit [How to GraphQL](https://www.howtographql.com/react-apollo/0-introduction/). You can more learn about the idea behind GraphQL boilerplates [here](https://blog.graph.cool/graphql-boilerplates-graphql-create-how-to-setup-a-graphql-project-6428be2f3a5).

## Requirements

You need to have the [GraphQL CLI](https://github.com/graphql-cli/graphql-cli) installed to bootstrap your GraphQL server using `graphql create`:

```sh
npm install -g graphql-cli
```


More details in the tuto: https://github.com/graphcool/prisma/tree/master/examples/auth

## Documentation

### Commands


* `prisma local nuke`
* `prisma reset`
* `prisma local start` to start your local Prisma cluster.

* `yarn start` starts GraphQL server on `http://localhost:4000`
* `yarn dev` starts GraphQL server on `http://localhost:4000` _and_ opens GraphQL Playground
* `yarn playground` opens the GraphQL Playground for the `projects` from `.graphqlconfig.yml`
* `yarn prisma <subcommand>` gives access to local version of Prisma CLI (e.g. `yarn prisma deploy`)

> **Note**: We recommend that you're using `yarn dev` during development as it will give you access to the GraphQL API or your server (defined by the application schema as well as to the Prisma API directly (defined by the Prisma database schema. If you're starting the server with `yarn start`, you'll only be able to access the API of the application schema.





# Contributing


Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions or want to contribute yourself, don't hesitate!

## To do

* ✓Implement materials https://material-ui-next.com/
* ✓Send emails: Welcome emails
* ✓Send emails: Forget Password
* ✓Send emails: validate Email
* ✓change/Reset password. send email confirmation
* ✓Organize logo image in readMe
* Create 3 Screenshots GIFS. Mobile friendly / auth / Post
* Implement Apollo Client 2.0
* Write medium post
* Upload all filetypes. A logo of a file will appear instead of picture
* Use File Handling instead of express to upload file: https://github.com/graphcool/prisma/tree/master/examples/file-handling-s3
