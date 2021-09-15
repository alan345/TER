<div align="center"><strong>N</strong>ode <strong>A</strong>pollo <strong>P</strong>risma <strong>E</strong>xpress <strong>R</strong>eact <strong>G</strong>raphQL
</div>
  
<h1 align="center"><strong>Boilerplate for a Fullstack GraphQL App with React & Prisma</strong></h1>

<br />

![naperg](https://user-images.githubusercontent.com/15246526/109192820-92db5680-774c-11eb-9480-d3a6883b8588.png)

<div align="center"><strong>🚀 Bootstrap your fullstack GraphQL app within seconds</strong></div>
<div align="center">Basic starter kit for a fullstack GraphQL app with React and Node.js - based on best practices from the GraphQL community.</div>

## Project

[![GitHub issues](https://img.shields.io/github/issues/alan345/naperg.svg)](https://github.com/alan345/naperg/issues)
[![GitHub forks](https://img.shields.io/github/forks/alan345/naperg.svg)](https://github.com/alan345/naperg/network)
[![GitHub stars](https://img.shields.io/github/stars/alan345/naperg.svg)](https://github.com/alan345/naperg/stargazers)
[![GitHub license](https://img.shields.io/github/license/alan345/naperg.svg)](https://github.com/alan345/naperg/blob/master/LICENSE)
![price](https://img.shields.io/badge/Price-Free-green.svg)
[![paypal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CLPDWGN5UA4CU)

[![Twitter](https://img.shields.io/twitter/url/https/github.com/alan345/naperg.svg?style=social)](https://twitter.com/intent/tweet?text=Wow!:&url=https%3A%2F%2Fgithub.com%2Falan345%2Fnaperg)

## Screenshots

| Login                                                                                                           | Signup                                                                                                          |
| --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| ![image](https://user-images.githubusercontent.com/15246526/105572454-164bf700-5d0c-11eb-98a2-11feb3fdc904.png) | ![image](https://user-images.githubusercontent.com/15246526/105572426-e8ff4900-5d0b-11eb-8944-23534de29c82.png) |
| ![image](https://user-images.githubusercontent.com/15246526/105612021-eb928a80-5d6d-11eb-8c36-0d81dc0f3953.png) | ![image](https://user-images.githubusercontent.com/15246526/105614214-e0932680-5d7c-11eb-8b14-d8da40c8c503.png) |
| ![image](https://user-images.githubusercontent.com/15246526/105619254-72af2500-5da5-11eb-99a5-45d7872927ab.png) | ![image](https://user-images.githubusercontent.com/15246526/105653682-419c2680-5e71-11eb-94eb-771b1dab2d6c.png) |
|                                                                                                                 |

## Getting started

#### 1. Clone the repo to your computer

```
git clone https://github.com/alan345/naperg/
```

#### 2. Go the the repo

```
cd naperg
```

## Server

#### 1. Install the server - # Prisma & Graphql (port 4000)

```
cd server
yarn
```

#### 2. migrate the database with `Prisma migrate` run:

More info if needed: [`Prisma Migrate`](https://www.prisma.io/docs/concepts/components/prisma-migrate)

```
npx prisma migrate dev
```

Pick a name for your first migration. Example "init"

```
> npx prisma migrate dev
Prisma schema loaded from prisma/schema.prisma
Datasource "db": SQLite database "dev.db" at "file:./dev.db"

SQLite database dev.db created at file:./dev.db

✔ Name of migration … init
The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20210227221806_init/
    └─ migration.sql

✔ Generated Prisma Client (2.17.0) to ./node_modules/@prisma/client in 71ms

Everything is now in sync.
```

To reset your database if needed, use Prisma Reset.

More info if needed: [`Prisma Reset`](https://www.prisma.io/docs/concepts/components/prisma-migrate#do-not-edit-or-delete-migrations-that-have-been-applied)

```
npx prisma migrate reset
```

#### 3. Seed your Database

More info if needed: [`Prisma Seed`](https://www.prisma.io/docs/guides/application-lifecycle/seed-database/)

```
npx prisma db seed
```

A new user will be created from [`seed.ts`](https://github.com/alan345/naperg/blob/master/server/prisma/seed.ts#L6-L14) file.

- login: `admin@naperg.com`
- pass: `admin`
- role: `ADMIN`

#### 4. Check you databse with Prisma Studio

More info if needed: [`Prisma Studio`](https://www.prisma.io/docs/concepts/components/prisma-studio)

```
$ npx prisma studio
```

![image](https://user-images.githubusercontent.com/15246526/109402305-b4ce0800-7909-11eb-88d7-924e4db3d74f.png)

#### 5. Generate the prisma client

Prisma Client is an auto-generated database client that's tailored to your database schema.

More info if needed: [`Prisma Generate`](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client)

```
npx prisma generate
```

#### 6. Start the server (http://localhost:4000)

```
yarn start
```

## Frontend

#### 1. Install the frontEnd - ReactJs (port 3000). In a new terminal run:

```sh
cd react
yarn
```

#### 2. Start the frontend.

```
yarn start
```

#### 3. Go to url: http://localhost:3000

#### 4. Log in to the app with whis Admin User:

- login: `admin@naperg.com`
- pass: `admin`
- role: `ADMIN`

## Tutorial

[![Tutorial Naperg](https://user-images.githubusercontent.com/15246526/109461303-c8b36000-7a16-11eb-88b0-fcf8a6d02209.png)](https://www.youtube.com/watch?v=KhDNp8Aw3HM)

## Features

- **Scalable GraphQL server:** The server uses [`apollo-server`](https://www.apollographql.com/docs/apollo-server/)
- **Pre-configured Apollo Client:** The project comes with a preconfigured setup for Apollo Client
- **Tooling**: Out-of-the-box support for [GraphQL Playground](https://github.com/prisma/graphql-playground)
- **Extensible**: Simple and flexible data model – easy to adjust and extend
- **Search with GraphQL**: Example to search in 2 fields for the users: Email and name
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
