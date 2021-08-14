# Composite App

RSS App

## architecture

Current version: ![For MVP version](docs/images/arc_1.png)

Future plans: ![Future architecture](docs/images/arc_2.png)

## project structure

```
├── docs // agreements and docs
├── server // backend with DB seed and APIs
│   │
│   common
│   │   │
│   │   ├── icons-kit // Все библиотеки уедут в отдельный репозиторий
│   │
│   core
│   │   │
│   │   └── ui-kit
│   │       ├── assets
│   │       ├── public
│   │       ├── exposes
│   │       ├── src
│   │       │   ├── @types
│   │       │   ├── Badge
│   │       │   ├── Button
│   │       │   ├── ...
│   │       │   └── vtb-ui-kit.tsx
│   │       ├── storybook
│   │       ├── .babelrc
│   │       ├── .eslintrc
│   │       ├── .gitignore
│   │       ├── .prettierignore
│   │       ├── .prettierrc.json
│   │       ├── .stylelintrc.js
│   │       ├── CHANGELOG.md
│   │       ├── babel.config.js
│   │       ├── exposes.json
│   │       ├── jest.config.js
│   │       ├── package.json
│   │       ├── testSetup.ts
│   │       ├── tsconfig.json
│   │       └── webpack.config.js
├── packages // приложения
|   |
│   ├── EXAMPLE // Приблизительная структура каждого проекта
│   │   ├── assets/styles
│   │   ├── exposes
│   │   ├── public
│   │   ├── src
│   │   │   ├── @types
│   │   │   ├── __mocks__
│   │   │   ├── components/Layout
│   │   │   ├── reducers
│   │   │   ├── utils
│   │   │   ├── DashboardPafe.tsx
│   │   │   ├── index.tsx
│   │   │   ├── root.component.test.tsx
│   │   │   ├── root.component.tsx
│   │   │   ├── styles.scss
│   │   │   └── store.ts
│   │   ├── .eslintrc
│   │   ├── .gitignore
│   │   ├── .prettierignore
│   │   ├── .prettierrc.json
│   │   ├── .stylelintrc.js
│   │   ├── CHANGELOG.md
│   │   ├── babel.config.js
│   │   ├── exposes.json
│   │   ├── jest.config.js
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── testSetup.ts
│   │   ├── tsconfig.json
│   │   └── webpack.config.js
|   |____
├── _index.html
├── .gitignore
├── .gitlab-ci.yml
├── CODE_CONTRIBUTING.md // правила оформления кода
├── GIT_CONTRIBUTING.md // правила работы с системой контроля версий
├── package.json
├── .gitignore
├── package.json
├── README.md // документация по всему проекту
└── yarn.lock
```

## Boilerplate source

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
git clone https://github.com/akimberl/naperg rss
```

#### 2. Go the the repo

```
cd rss
```

## Server

#### 1. Install the server - # Prisma & Graphql (port 4000)

```
cd server
yarn
```

#### 2. install Postgresql database with on your local machine:

More info: [`Official PostgresQL download link`](https://www.postgresql.org/download/)

#### 3. migrate the database with `Prisma migrate` run:

More info if needed: [`Prisma Migrate`](https://www.prisma.io/docs/concepts/components/prisma-migrate)

```
npx prisma migrate dev
```

Pick a name for your first migration. Example "init"

```
> npx prisma migrate dev
Prisma schema loaded from prisma/schema.prisma
Datasource "db": Postgresql database "rss"

To reset your database if needed, use Prisma Reset.

More info if needed: [`Prisma Reset`](https://www.prisma.io/docs/concepts/components/prisma-migrate#do-not-edit-or-delete-migrations-that-have-been-applied)

```
npx prisma migrate reset --preview-feature
```

#### 3. Seed your Database

More info if needed: [`Prisma Seed`](https://www.prisma.io/docs/guides/application-lifecycle/seed-database/)

```
npx prisma db seed --preview-feature
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
- Database PostgresQL. You can replace by the database you want (MySQL - SQLite - SQL Server). Check the prisma documentation https://www.prisma.io/docs/concepts/

# Contributing

- Your feedback is **very helpful**, please share your opinion and thoughts! If you have any questions or want to contribute yourself, don't hesitate!

- Tests must be implemented. Feel free to create a PR :)

- Add a star to this Repo! It helps a lot!

## Структура проекта

```
├── docs // правила работы
├── libs // пакеты с библиотеками
│   │
│   common
│   │   │
│   │   ├── icons-kit // Все библиотеки уедут в отдельный репозиторий
│   │
│   core
│   │   │
│   │   └── ui-kit
│   │       ├── assets
│   │       ├── public
│   │       ├── exposes
│   │       ├── src
│   │       │   ├── @types
│   │       │   ├── Badge
│   │       │   ├── Button
│   │       │   ├── ...
│   │       │   └── vtb-ui-kit.tsx
│   │       ├── storybook
│   │       ├── .babelrc
│   │       ├── .eslintrc
│   │       ├── .gitignore
│   │       ├── .prettierignore
│   │       ├── .prettierrc.json
│   │       ├── .stylelintrc.js
│   │       ├── CHANGELOG.md
│   │       ├── babel.config.js
│   │       ├── exposes.json
│   │       ├── jest.config.js
│   │       ├── package.json
│   │       ├── testSetup.ts
│   │       ├── tsconfig.json
│   │       └── webpack.config.js
├── packages // приложения
|   |
│   ├── EXAMPLE // Приблизительная структура каждого проекта
│   │   ├── assets/styles
│   │   ├── exposes
│   │   ├── public
│   │   ├── src
│   │   │   ├── @types
│   │   │   ├── __mocks__
│   │   │   ├── components/Layout
│   │   │   ├── reducers
│   │   │   ├── utils
│   │   │   ├── DashboardPafe.tsx
│   │   │   ├── index.tsx
│   │   │   ├── root.component.test.tsx
│   │   │   ├── root.component.tsx
│   │   │   ├── styles.scss
│   │   │   └── store.ts
│   │   ├── .eslintrc
│   │   ├── .gitignore
│   │   ├── .prettierignore
│   │   ├── .prettierrc.json
│   │   ├── .stylelintrc.js
│   │   ├── CHANGELOG.md
│   │   ├── babel.config.js
│   │   ├── exposes.json
│   │   ├── jest.config.js
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   ├── testSetup.ts
│   │   ├── tsconfig.json
│   │   └── webpack.config.js
|   |____
├── _index.html
├── .gitignore
├── .gitlab-ci.yml
├── CODE_CONTRIBUTING.md // правила оформления кода
├── GIT_CONTRIBUTING.md // правила работы с системой контроля версий
├── package.json
├── .gitignore
├── package.json
├── README.md // документация по всему проекту
└── yarn.lock
```

## Документация

- [Правила оформления кода](./docs/Оформление_кода.md)
- [Правила оформления стилей](./docs/Работа_со_стилями.md)
- [Работа с системой контроля версий](./docs/Работа_с_гитом.md)
- [Описание CI/CD](./docs/Описание_CI_CD.md)
- [Работа с typescript](./docs/Работа_с_Typescript.md)
- [Работа с шрифтами](./docs/Работа_с_Шрифтами.md)
- [Работа с иконками](./docs/Работа_с_Иконками.md)
- [Работа с либами](./docs/Работа_с_либами.md)
- [Работа с Module Federation](./docs/Работа_с_Module_Federation.md)
- [Настройка nginx](./docs/nginx.md)
- [Возможные ошибки при работе с проектом](./docs/Возможные_ошибки.md)
- [core-context](./docs/Работа_с_core-context.md)
