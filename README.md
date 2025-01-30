<div align="center">
  <img src="https://github.com/user-attachments/assets/f9729f43-485a-44d4-b85d-f93dc5c09988" alt="image" height="180"/>
</div>

<h1 align="center"><strong>Fullstack SaaS Boilerplate</strong></h1>
<h3 align="center">Built with <a href="https://fastify.io">Fastify</a>, <a href="https://trpc.io">tRPC</a>, and <a href="https://reactjs.org">React</a>.</h3>

## Project

[![GitHub issues](https://img.shields.io/github/issues/alan345/Fullstack-SaaS-Boilerplate.svg)](https://github.com/alan345/Fullstack-SaaS-Boilerplate/issues)
[![GitHub forks](https://img.shields.io/github/forks/alan345/Fullstack-SaaS-Boilerplate.svg)](https://github.com/alan345/Fullstack-SaaS-Boilerplate/network)
[![GitHub stars](https://img.shields.io/github/stars/alan345/Fullstack-SaaS-Boilerplate.svg)](https://github.com/alan345/Fullstack-SaaS-Boilerplate/stargazers)
[![GitHub license](https://img.shields.io/github/license/alan345/Fullstack-SaaS-Boilerplate.svg)](https://github.com/alan345/Fullstack-SaaS-Boilerplate/blob/master/LICENSE)

## Demo

<a href="https://client.ter.work.gd/" >
  <img width="150" alt="Demo Fullstack-SaaS-Boilerplate" src="https://github.com/user-attachments/assets/b343633f-237a-4377-b8be-114185103645">
</a>

Hosted by [render.com](http://render.com/) for free

## Preview

![demo](https://github.com/user-attachments/assets/4e98f29e-add9-40b2-9df5-98a04995a3e9)

## Main Stack


- [Drizzle](https://orm.drizzle.team/) - A TypeScript-first ORM for Node.js
- [Fastify](https://fastify.io) - Fast, unopinionated, minimalist web framework for Node.js
- [Postgres](https://www.postgresql.org) - The world's most advanced open source database
- [React 19](https://reactjs.org) - A JavaScript library for building user interfaces
- [Tailwind v4](https://tailwindcss.com) - A utility-first CSS framework for rapid UI development
- [tRPC](https://trpc.io) - End-to-end typesafe APIs made easy

## Other dependencies

- [Bcrypt](https://www.npmjs.com/package/bcrypt) - A JavaScript library for hashing passwords
- [JWT](https://jwt.io) - JSON Web Tokens for authentication
- [NPM Workspace](https://docs.npmjs.com/cli/v10/using-npm/workspaces) Workspaces for managing multiple packages in a single repository
- [Phosphor Icons](https://phosphoricons.com) - A flexible icon family for interfaces, diagrams, presentations — whatever, really
- [Playwright](https://playwright.dev) - Test your web apps headlessly with a single API
- [React Router v7](https://reactrouter.com) - Declarative routing for React
- [TypeScript](https://www.typescriptlang.org) - TypeScript is a typed superset of JavaScript
- [ZOD](https://zod.dev) - TypeScript-first schema validation with static type inference
- [Vite](https://vitejs.dev) - Next generation frontend tooling. It's fast!

## Features

- [HttpOnly cookies](https://owasp.org/www-community/HttpOnly) for Authentication (Signup, login, and logout)
- [Beers from random-data-api.com](https://random-data-api.com) Example of pulling data from externals REST API
- [React context](https://react.dev/reference/react/useContext) is used to store the user's details when logged in
- Health Check for the server (http://localhost:2022/health)
- Search with Debounce Using a Custom Hook

## Installation

- Update the server `server.env` [file](https://github.com/alan345/Fullstack-SaaS-Boilerplate/blob/main/server.env) and the client `client.env` [file](https://github.com/alan345/Fullstack-SaaS-Boilerplate/blob/main/client/client.env) with your credentials
- Update the `.gitignore` [file](https://github.com/alan345/Fullstack-SaaS-Boilerplate/blob/main/.gitignore) by uncommenting `# .env` to ensure your credentials remain private and are not exposed.
- Make sure Postgres is running and create a new database called `fsb`

```bash
psql -U user // replace user by your postgres user
CREATE DATABASE fsb;
```

- Run in the terminal In the root directory:

```bash
// Install the dependencies
npm i

// Setup the database
npm run push

// Seed the database
npm run seed

// Run the app (it will run the client and the server automatically)
npm run dev
```

## Building for production

```bash
npm run build
npm run start
```

## Printscreens

<img width="1150" alt="Screenshot 2025-01-29 at 9 23 13 AM" src="https://github.com/user-attachments/assets/6b8596cc-8367-487b-931e-6809123b1fd4" />
<img width="1150" alt="Screenshot 2025-01-29 at 9 23 22 AM" src="https://github.com/user-attachments/assets/a4f241e9-01b8-489f-98b5-aeeeba816a4d" />
<img width="1150" alt="Screenshot 2025-01-29 at 9 23 27 AM" src="https://github.com/user-attachments/assets/8bff976d-89bd-4c6b-83f9-a08fa60c4360" />
<img width="1150" alt="Screenshot 2025-01-29 at 9 23 32 AM" src="https://github.com/user-attachments/assets/647b8b08-f75e-48b0-9be1-028b8a55cdc0" />
<img width="1150" alt="Screenshot 2025-01-29 at 9 23 37 AM" src="https://github.com/user-attachments/assets/c928afeb-119a-4bbc-b85a-9f9103fe398d" />
<img width="1150" alt="Screenshot 2025-01-29 at 9 23 40 AM" src="https://github.com/user-attachments/assets/5fe2a032-f161-4808-a239-16eb1bf4a5b9" />
<img width="1150" alt="Screenshot 2025-01-29 at 9 23 46 AM" src="https://github.com/user-attachments/assets/9fe3d828-184c-4754-be92-5d8f6b9327df" />

#### Health Check for the server (http://localhost:2022/health)

<img width="431" alt="Health Check" src="https://github.com/user-attachments/assets/c6153606-5011-4717-911a-afdb63ecc4c0">

## Motivation

Focusing on developer experience: simple, efficient, and fast. This modern stack uses top-tier libraries to build a full-stack web application. Unlike the T3 app (https://create.t3.gg), we opted not to use Next.js, allowing the frontend to remain as static files, easily stored in cloud object storage like AWS S3. Consequently, this stack is designed for building web apps rather than traditional websites, as it is not SEO-friendly.

## End-to-end typesafe with Trpc

![trpc-video-ter](https://github.com/user-attachments/assets/7ee27bbb-5e56-484c-b046-fe0186b4321d)
Video from https://trpc.io

## E2E Testing

The tests must be run while the app is running.

#### Running the tests in the Terminal

```
npm run test:e2e
```

## Other recommendations

- Need a component library? Check out [Chakra UI](https://v2.chakra-ui.com/)
- If your stack is getting more and more shared workspaces, consider using [pnpm](https://pnpm.io/workspaces) instead of npm

## Who is using TER?

- [Nachonacho.com](https://Nachonacho.com) - The world's largest marketplace for Software & Services

Create a PR if you want to add your project here.

## Miscellaneous

Discover the details of this project in

- [Medium post](https://alan-szternberg.medium.com/create-a-full-stack-app-with-trpc-react-and-express-35ed95f0851a)
- [Dev.to post](https://dev.to/alan345/how-to-create-a-web-app-in-2024-using-a-modern-stack-react-trpc-and-express-4eac)

<div align="center">
  <img src="https://github.com/user-attachments/assets/60297acc-81a1-46af-93ec-d281be20757b" alt="image" height="260"/>
</div>
