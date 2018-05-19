<div align="center"><strong>N</strong>ode <strong>A</strong>pollo <strong>P</strong>risma <strong>E</strong>xpress <strong>R</strong>eact <strong>G</strong>raphQL
</div>
  
<h1 align="center"><strong>Boilerplate for a Fullstack GraphQL App with React & Prisma</strong></h1>
<h3 align="center">Authentication with permissions & roles. Backend & Frontend</h3>
<h3 align="center">Upload image with expressJs</h3>
<h3 align="center">Chat with GraphQL Subscriptions</h3>
<br />



![image](https://user-images.githubusercontent.com/15246526/38530809-7a9cc69e-3c21-11e8-8eb9-6f143eb7d64d.png)


<div align="center"><strong>🚀 Bootstrap your fullstack GraphQL app within seconds</strong></div>
<div align="center">Basic starter kit for a fullstack GraphQL app with React and Node.js - based on best practices from the GraphQL community.</div>



## Screenshots



| Mobile Friendly  | Login with Avatar Profile |
| ------------- | ------------- |
| ![Mobile friendly](https://j.gifs.com/1rDk1o.gif) | ![avatar profile](https://j.gifs.com/Q0Gk67.gif) |
| Order by / pagination | Email Validation
| ![Mobile friendly](https://j.gifs.com/W7RALn.gif) | ![image](https://user-images.githubusercontent.com/15246526/38842888-58a8858e-41a1-11e8-91d0-1d5535da7e1e.png)  |
|  | Forget Password |
| ![image](https://user-images.githubusercontent.com/15246526/38843148-8eaa2a06-41a2-11e8-9130-d74194d39031.png)  | ![image](https://user-images.githubusercontent.com/15246526/38843003-f05421a4-41a1-11e8-96a8-3c442a5fd07c.png) |
| Users List | User profile |
|![connected object](https://j.gifs.com/xvwg93.gif) | ![User profile](https://j.gifs.com/APl611.gif) |
|Login|Resend Link to validate email|
|![Login](https://j.gifs.com/wml6jg.gif)|![Link to validate email](https://j.gifs.com/PZ8V2z.gif)|
|Create Draft with connected object (car & user)| Update Password in app|
|![connected object](https://j.gifs.com/VP9G0o.gif)|![connected object](https://j.gifs.com/860QVr.gif)|
|Signup with key 'Enter' to change field| Chat |
|![connected object](https://j.gifs.com/W7X5rn.gif)|![Chat](https://j.gifs.com/PZV19W.gif)|






## Getting started
1/ In folder `/server/src/config` rename file `config_example.js` to `config.js` and add your own settings


2/ Install docker and Prisma cli. (https://www.prisma.io/docs/quickstart/)


3/ In folder `/server`, run:
```sh
`docker-compose up -d` init app
`prisma deploy` Deploy app
```

4/ In 3 different terminals:


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



## Features

- **Scalable GraphQL server:** The server uses [`graphql-yoga`](https://github.com/prisma/graphql-yoga) which is based on Apollo Server & Express
- **Pre-configured Apollo Client:** The project comes with a preconfigured setup for Apollo Client
- **GraphQL database:** Includes GraphQL database binding to [Prisma](https://www.prismagraphql.com) (running on MySQL)
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground) & [query performance tracing](https://github.com/apollographql/apollo-tracing)
- **Extensible**: Simple and flexible data model – easy to adjust and extend
- **No configuration overhead**: Preconfigured [`graphql-config`](https://github.com/prisma/graphql-config) setup

For a fully-fledged **React & Apollo tutorial**, visit [How to GraphQL](https://www.howtographql.com/react-apollo/0-introduction/). You can more learn about the idea behind GraphQL boilerplates [here](https://blog.graph.cool/graphql-boilerplates-graphql-create-how-to-setup-a-graphql-project-6428be2f3a5).



## Documentation

### useful Commands

* `prisma reset`
* `docker container ls` list container
* `docker stop database_prisma_1` stop container
* `docker rm database_prisma_1` remove container
* `docker stop $(docker ps -a -q)` stop all container
* `docker rm $(docker ps -a -q)` remove all container
* `docker-compose up -d` init app
* `prisma deploy` Deploy app

* `yarn start` starts GraphQL server on `http://localhost:4000`
* `yarn dev` starts GraphQL server on `http://localhost:4000` _and_ opens GraphQL Playground
* `yarn playground` opens the GraphQL Playground for the `projects` from `.graphqlconfig.yml`
* `yarn prisma <subcommand>` gives access to local version of Prisma CLI (e.g. `yarn prisma deploy`)

> **Note**: We recommend that you're using `yarn dev` during development as it will give you access to the GraphQL API or your server (defined by the application schema as well as to the Prisma API directly (defined by the Prisma database schema. If you're starting the server with `yarn start`, you'll only be able to access the API of the application schema.




## Made with..

Frontend:
* User interfaces: React https://reactjs.org/
* Design: material-ui-next https://material-ui-next.com/
* GraphQL tool: Apollo Client https://www.apollographql.com/

Backend:
* Server JS: ExpressJs http://expressjs.com/fr/
* Server GraphQL: Prisma https://www.prisma.io/
* Database MySQL: https://www.mysql.com/
* Send email: nodemailer https://nodemailer.com/


# Contributing


Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions or want to contribute yourself, don't hesitate!
