<div align="center"><strong>N</strong>ode <strong>A</strong>pollo <strong>P</strong>risma <strong>E</strong>xpress <strong>R</strong>eact <strong>G</strong>raphQL
</div>
  
<h1 align="center"><strong>Boilerplate for a Fullstack GraphQL App with React & Prisma</strong></h1>
<h3 align="center">Authentication with roles & permissions. Backend & Frontend</h3>
<h3 align="center">Upload image with expressJs</h3>
<h3 align="center">Chat with GraphQL Subscriptions</h3>
<br />

![image](https://user-images.githubusercontent.com/15246526/38530809-7a9cc69e-3c21-11e8-8eb9-6f143eb7d64d.png)

<div align="center"><strong>🚀 Bootstrap your fullstack GraphQL app within seconds</strong></div>
<div align="center">Basic starter kit for a fullstack GraphQL app with React and Node.js - based on best practices from the GraphQL community.</div>

## Project

[![GitHub issues](https://img.shields.io/github/issues/alan345/naperg.svg)](https://github.com/alan345/naperg/issues)
[![GitHub forks](https://img.shields.io/github/forks/alan345/naperg.svg)](https://github.com/alan345/naperg/network)
[![GitHub stars](https://img.shields.io/github/stars/alan345/naperg.svg)](https://github.com/alan345/naperg/stargazers)
[![GitHub license](https://img.shields.io/github/license/alan345/naperg.svg)](https://github.com/alan345/naperg/blob/master/LICENSE)
![price](https://img.shields.io/badge/Price-Free-green.svg)
[![paypal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CLPDWGN5UA4CU)

[![Twitter](https://img.shields.io/twitter/url/https/github.com/alan345/naperg.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Falan345%2Fnaperg)

## Screenshots

| Signup with key 'Enter' to change field                                                                        | Chat                                                                                                           |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| ![Signup](https://j.gifs.com/XoBnGk.gif)                                                                       | ![Chat](https://j.gifs.com/APY7Jl.gif)                                                                         |
| Order by / pagination                                                                                          | Email Validation                                                                                               |
| ![Mobile friendly](https://j.gifs.com/W7RALn.gif)                                                              | ![image](https://user-images.githubusercontent.com/15246526/38842888-58a8858e-41a1-11e8-91d0-1d5535da7e1e.png) |
|                                                                                                                | Forget Password                                                                                                |
| ![image](https://user-images.githubusercontent.com/15246526/38843148-8eaa2a06-41a2-11e8-9130-d74194d39031.png) | ![image](https://user-images.githubusercontent.com/15246526/38843003-f05421a4-41a1-11e8-96a8-3c442a5fd07c.png) |
| Users List                                                                                                     | User profile                                                                                                   |
| ![connected object](https://j.gifs.com/xvwg93.gif)                                                             | ![User profile](https://j.gifs.com/APl611.gif)                                                                 |
| Login                                                                                                          | Resend Link to validate email                                                                                  |
| ![Login](https://j.gifs.com/wml6jg.gif)                                                                        | ![Link to validate email](https://j.gifs.com/PZ8V2z.gif)                                                       |
| Create Draft with connected object (car & user)                                                                | Update Password in app                                                                                         |
| ![connected object](https://j.gifs.com/VP9G0o.gif)                                                             | ![connected object](https://j.gifs.com/860QVr.gif)                                                             |
| Mobile Friendly                                                                                                | Login with Avatar Profile                                                                                      |
| ![Mobile friendly](https://j.gifs.com/1rDk1o.gif)                                                              | ![avatar profile](https://j.gifs.com/Q0Gk67.gif)                                                               |
| REST API with graphql-yoga                                                                                     |                                                                                                                |
| ![REST API with graphql-yoga](https://j.gifs.com/L8mnpg.gif)                                                   |                                                                                                                |

## Getting started

1/ In folder `/server/src/config` rename file `config_example.js` to `config.js` and add your own settings

2/ Install docker and Prisma cli. (https://www.prisma.io/docs/get-started/01-setting-up-prisma-new-database-a002/)

3/ In folder `/server`, run:

```sh
#init app
docker-compose up -d


#Deploy app
prisma deploy
```

4/ In 3 different terminals:

```sh
# Prisma: Graphql and mySql (port 4000)
cd server
yarn install
yarn start
```

```sh
# Media server: ExpressJs (port 8000)
cd media
yarn install
yarn start
```

```sh
# Frontend: ReactJs (port 3000)
cd react
yarn install
yarn start
```

Go to url: http://localhost:3000

## Features

- **Scalable GraphQL server:** The server uses [`graphql-yoga`](https://github.com/prisma/graphql-yoga) which is based on Apollo Server & Express
- **Pre-configured Apollo Client:** The project comes with a preconfigured setup for Apollo Client
- **GraphQL database:** Includes GraphQL database binding to [Prisma](https://www.prismagraphql.com) (running on MySQL)
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground)
- **Extensible**: Simple and flexible data model – easy to adjust and extend
- **Chat**: Made with Prisma & apollo subscription. (WebSocket)
- **Email management**:
  - Welcome email + link to validate the email
  - Forget password email
- **Signup management**:
  - Check password strength
  - Send welcome email + link to validate the email
  - App knows if email has been approved by the link

For a fully-fledged **React & Apollo tutorial**, visit [How to GraphQL](https://www.howtographql.com/react-apollo/0-introduction/).

## Documentation

### useful Commands

- `prisma reset`
- `docker container ls` list container
- `docker stop database_prisma_1` stop container
- `docker rm database_prisma_1` remove container
- `docker stop $(docker ps -a -q)` stop all container
- `docker rm $(docker ps -a -q)` remove all container
- `docker-compose up -d` init app
- `prisma deploy` Deploy app

- `eslint .` Check JS/react syntax with eslint-plugin-react

- `yarn start` starts GraphQL server on `http://localhost:4000`
- `yarn dev` starts GraphQL server on `http://localhost:4000` _and_ opens GraphQL Playground
- `yarn playground` opens the GraphQL Playground for the `projects` from `.graphqlconfig.yml`
- `yarn prisma <subcommand>` gives access to local version of Prisma CLI (e.g. `yarn prisma deploy`)

> **Note**: We recommend that you're using `yarn dev` during development as it will give you access to the GraphQL API or your server (defined by the application schema as well as to the Prisma API directly (defined by the Prisma database schema. If you're starting the server with `yarn start`, you'll only be able to access the API of the application schema.

## Made with..

Frontend:

- User interfaces: React https://reactjs.org/
- Design: material-ui-next https://material-ui-next.com/
- GraphQL tool: Apollo Client https://www.apollographql.com/

Backend:

- Server JS: ExpressJs http://expressjs.com/fr/
- Server GraphQL: GraphQL yoga https://github.com/prismagraphql/graphql-yoga
- ORM (object-relational mapping): Prisma https://www.prisma.io/
- Database MySQL: https://www.mysql.com/
- Send email: nodemailer https://nodemailer.com/

# Contributing

-Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions or want to contribute yourself, don't hesitate!

-Tests must be implemented. Feel free to create a PR :)

-Add a react hook as an example. https://reactjs.org/docs/hooks-intro.html

-Add a star to this Repo! It helps a lot!

# Buy me a drink!

If this project help you reduce time to develop, you can give me a cup of coffee :)

[![paypal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CLPDWGN5UA4CU)
