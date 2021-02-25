<div align="center"><strong>N</strong>ode <strong>A</strong>pollo <strong>P</strong>risma <strong>E</strong>xpress <strong>R</strong>eact <strong>G</strong>raphQL
</div>
  
<h1 align="center"><strong>Boilerplate for a Fullstack GraphQL App with React & Prisma</strong></h1>
<h3 align="center">Authentication</h3>

<br />

![naperg](https://user-images.githubusercontent.com/31717079/109178534-f5fdd500-77ae-11eb-8420-d2f9cfbb7334.png)

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

| Login                                                                                                           | Signup                                                                                                          |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| ![image](https://user-images.githubusercontent.com/15246526/105572454-164bf700-5d0c-11eb-98a2-11feb3fdc904.png) | ![image](https://user-images.githubusercontent.com/15246526/105572426-e8ff4900-5d0b-11eb-8944-23534de29c82.png) |
| ![image](https://user-images.githubusercontent.com/15246526/105612021-eb928a80-5d6d-11eb-8c36-0d81dc0f3953.png) | ![image](https://user-images.githubusercontent.com/15246526/105614214-e0932680-5d7c-11eb-8b14-d8da40c8c503.png) |
| ![image](https://user-images.githubusercontent.com/15246526/105619254-72af2500-5da5-11eb-99a5-45d7872927ab.png) | ![image](https://user-images.githubusercontent.com/15246526/105653682-419c2680-5e71-11eb-94eb-771b1dab2d6c.png) |
|                                                                                                                 |

## Getting started

1. migrate the database with `Prisma migrate`
   run:

```
npx prisma migrate dev --preview-feature
```
A user will be automatically created from the [`seed.ts`](https://github.com/alan345/naperg/blob/master/server/prisma/seed.ts#L6-L14) file.
- login: `admin@naperg.com`
- pass: `admin`
- role: `ADMIN`


2. generate the prisma client

```
npx prisma generate
```

3. In 2 different terminals:

```sh
# Prisma & Graphql (port 4000)

cd server
yarn
yarn start

```

```sh
# Frontend: ReactJs (port 3000)

cd react
yarn
yarn start

```

Go to url: http://localhost:3000

## Features

- **Scalable GraphQL server:** The server uses [`apollo-server`](https://www.apollographql.com/docs/apollo-server/)
- **Pre-configured Apollo Client:** The project comes with a preconfigured setup for Apollo Client
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground)
- **Extensible**: Simple and flexible data model – easy to adjust and extend
- **Search with GraphQL**: Exampel to search in 2 fields for the users: Email and name
- **Signup management**:
  - Check password strength

For a fully-fledged **React & Apollo tutorial**, visit [How to GraphQL](https://www.howtographql.com/react-apollo/0-introduction/).

## Made with..

Typescript (https://www.typescriptlang.org/) for the Frontend and the Backend

Frontend:

- User interfaces: React https://reactjs.org/
- Design: material-ui-next https://material-ui.com/
- GraphQL tool: Apollo Client https://www.apollographql.com/

Backend:

- Server JS: ExpressJs https://expressjs.com/
- Server GraphQL: https://www.apollographql.com/docs/apollo-server/)
- ORM (object-relational mapping): Prisma https://www.prisma.io/
- Database sqlite: https://www.sqlite.org/index.html. You can replace by the database you want (PostgreSQL - MySQL - SQLite - SQL Server). Check the prisma documentation https://www.prisma.io/docs/concepts/

# Contributing

- Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions or want to contribute yourself, don't hesitate!

- Tests must be implemented. Feel free to create a PR :)

- Add a star to this Repo! It helps a lot!

# Who is using Naperg

- [NachoNacho, the BtoB SaaS marketplace for subscriptions](https://nachonacho.com)

Create a PR if you are using Naperg and want to add your link here

# Buy me a drink!

If this project help you reduce time to develop, you can give me a cup of coffee :)

[![paypal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CLPDWGN5UA4CU)
