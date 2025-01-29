<div align="center">
<img src="https://github.com/user-attachments/assets/511251ae-67f8-4205-96af-5a1d9e472500" alt="image" height="300"/>
<br />

![image](https://github.com/user-attachments/assets/750d0f0e-ed45-4416-8f86-27aee240e642)

  
</div>

<h1 align="center"><strong>Fullstack SaaS Boilerplate</strong></h1>
<h3 align="center">Built with tRPC, Fastify and React</h3>

## Project

[![GitHub issues](https://img.shields.io/github/issues/alan345/Fullstack-SaaS-Boilerplate.svg)](https://github.com/alan345/Fullstack-SaaS-Boilerplate/issues)
[![GitHub forks](https://img.shields.io/github/forks/alan345/Fullstack-SaaS-Boilerplate.svg)](https://github.com/alan345/Fullstack-SaaS-Boilerplate/network)
[![GitHub stars](https://img.shields.io/github/stars/alan345/Fullstack-SaaS-Boilerplate.svg)](https://github.com/alan345/Fullstack-SaaS-Boilerplate/stargazers)
[![GitHub license](https://img.shields.io/github/license/alan345/Fullstack-SaaS-Boilerplate.svg)](https://github.com/alan345/Fullstack-SaaS-Boilerplate/blob/master/LICENSE)
[![price](https://img.shields.io/badge/Price-Free-green.svg)](https://buymeacoffee.com/fullstackter)
[![paypal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://buymeacoffee.com/fullstackter)

[![Twitter](https://img.shields.io/twitter/url/https/github.com/alan345/Fullstack-SaaS-Boilerplate.svg?style=social)](https://twitter.com/intent/tweet?text=Wow!:&url=https%3A%2F%2Fgithub.com%2Falan345%2Fter)

## Demo

<a href="https://client.ter.work.gd/" >
  <img width="150" alt="Demo TER" src="https://github.com/user-attachments/assets/b343633f-237a-4377-b8be-114185103645">
</a>

Hosted by [render.com](http://render.com/) for free

## Preview

![ter-preview](https://github.com/user-attachments/assets/c9d549a4-7020-498d-9e7e-e5c92600dd51)

## Stack

- [Bcrypt](https://www.npmjs.com/package/bcrypt) - A JavaScript library for hashing passwords
- [Drizzle](https://orm.drizzle.team/) - A TypeScript-first ORM for Node.js
- [Fastify](https://fastify.io) - Fast, unopinionated, minimalist web framework for Node.js
- [JWT](https://jwt.io) - JSON Web Tokens for authentication
- [NPM Workspace](https://docs.npmjs.com/cli/v10/using-npm/workspaces) Workspaces for managing multiple packages in a single repository
- [Phosphor Icons](https://phosphoricons.com) - A flexible icon family for interfaces, diagrams, presentations — whatever, really
- [Playwright](https://playwright.dev) - Test your web apps headlessly with a single API
- [Postgres](https://www.postgresql.org) - The world's most advanced open source database
- [React 19](https://reactjs.org) - A JavaScript library for building user interfaces
- [React Router v7](https://reactrouter.com) - Declarative routing for React
- [Tailwind v4](https://tailwindcss.com) - A utility-first CSS framework for rapid UI development
- [tRPC](https://trpc.io) - End-to-end typesafe APIs made easy
- [TypeScript](https://www.typescriptlang.org) - TypeScript is a typed superset of JavaScript
- [Vite](https://vitejs.dev) - Next generation frontend tooling. It's fast!
- [ZOD](https://zod.dev) - TypeScript-first schema validation with static type inference

## Features

- [HttpOnly cookies](https://owasp.org/www-community/HttpOnly) for Authentication (Signup, login, and logout)
- [Beers from random-data-api.com](https://random-data-api.com) Example of pulling data from externals REST API
- [React context](https://react.dev/reference/react/useContext) is used to store the user's details when logged in
- Health Check for the server (http://localhost:2022/health)
- Search with Debounce Using a Custom Hook

## Installation

- Update the server `server.env` [file](https://github.com/alan345/Fullstack-SaaS-Boilerplate/blob/main/server.env) and the client `client.env` [file](https://github.com/alan345/Fullstack-SaaS-Boilerplate/blob/main/client/client.env) with your credentials
- Update the `.gitignore` [file](https://github.com/alan345/Fullstack-SaaS-Boilerplate/blob/main/.gitignore) by uncommenting `# .env` to ensure your credentials remain private and are not exposed.
- Make sure Postgres is running and create a new database called `ter`

```bash
psql -U user // replace user by your postgres user
CREATE DATABASE ter;
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

<img width="1240" alt="Ter - Home" src="https://github.com/user-attachments/assets/03327d88-bcc6-482b-832e-bd5433756aa0">
<img width="1240" alt="Ter - Login" src="https://github.com/user-attachments/assets/cc229157-7066-427d-ae53-c7b3a280d835">
<img width="1240" alt="Ter - Signup" src="https://github.com/user-attachments/assets/41cc01de-5296-46a3-8cc3-4e37651d383b">
<img width="1240" alt="Ter - Profile" src="https://github.com/user-attachments/assets/c7233558-0e8f-4d53-87e7-77db87101677">
<img width="1240" alt="Ter - Users" src="https://github.com/user-attachments/assets/121c11d3-1dc7-41a8-92f7-63ac9ca437a3">
<img width="1240" alt="Ter - Devices" src="https://github.com/user-attachments/assets/10bd71cb-406b-4989-83aa-20fd5ce32e9b">
<img width="1240" alt="Ter - Beers" src="https://github.com/user-attachments/assets/a99d8da4-9c9f-41f5-9aae-040ce7fe5e91">

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
  <a href="https://buymeacoffee.com/fullstackter">
    <img width="300" alt="bmc-button" src="https://github.com/user-attachments/assets/f384fb79-52ed-4c25-bbc1-ae640385f5e4">
  </a>
</div>

<div align="center">
  <a href="https://buymeacoffee.com/fullstackter">
    <img src="https://github.com/user-attachments/assets/c9ce1733-4002-44a9-9ab3-a3bc365b3648" alt="image" width="300"/>
  </a>
</div>

<sub>
  <sub>
  A "TER" in France stands for "Train Express Régional." It's a regional rail network that provides a vital service connecting smaller towns and cities across various regions to larger urban centers. Managed by SNCF, the French national railway company, TERs are often used for commuting to work, school, or for regional travel, offering an efficient and environmentally friendly alternative to driving. The trains vary in frequency and speed, depending on the region and the distances they cover.
  </sub>
</sub>
