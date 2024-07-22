<div align="center">
<img src="https://github.com/user-attachments/assets/cc3cc768-9ee4-4c9b-b108-4c0979acbee8" alt="image" width="300"/>
<br />
<strong>T</strong>rpc <strong>E</strong>xpress <strong>R</strong>eact

</div>

<h1 align="center"><strong>Boilerplate for a Fullstack App with authentication</strong></h1>

## Project

[![GitHub issues](https://img.shields.io/github/issues/alan345/ter.svg)](https://github.com/alan345/ter/issues)
[![GitHub forks](https://img.shields.io/github/forks/alan345/ter.svg)](https://github.com/alan345/ter/network)
[![GitHub stars](https://img.shields.io/github/stars/alan345/ter.svg)](https://github.com/alan345/ter/stargazers)
[![GitHub license](https://img.shields.io/github/license/alan345/ter.svg)](https://github.com/alan345/ter/blob/master/LICENSE)
[![price](https://img.shields.io/badge/Price-Free-green.svg)](https://buymeacoffee.com/fullstackter)
[![paypal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://buymeacoffee.com/fullstackter)

[![Twitter](https://img.shields.io/twitter/url/https/github.com/alan345/ter.svg?style=social)](https://twitter.com/intent/tweet?text=Wow!:&url=https%3A%2F%2Fgithub.com%2Falan345%2Fter)

## Main Stack

- <strong>T</strong>rpc https://trpc.io (End-to-end typesafe APIs made easy)
- <strong>E</strong>xpress https://expressjs.com (Fast, unopinionated, minimalist web framework for node)
- <strong>R</strong>eact https://reactjs.org (A JavaScript library for building user interfaces)

## Other Libraries

- Tailwind CSS https://tailwindcss.com (A utility-first CSS framework for rapid UI development)
- TypeScript https://www.typescriptlang.org (TypeScript is a typed superset of JavaScript)
- JWT https://jwt.io (JSON Web Tokens)
- ZOD https://zod.dev (TypeScript-first schema validation with static type inference)
- Vite https://vitejs.dev (Next generation frontend tooling. It's fast!)
- Bcrypt https://www.npmjs.com/package/bcrypt (A JavaScript library for hashing passwords)
- Playwright https://playwright.dev (Test your web apps headlessly with a single API)
- NPM https://www.npmjs.com (Node Package Manager)

## Features

- Authentication with JWT and HttpOnly cookies (https://owasp.org/www-community/HttpOnly)
- Example of pulling data from an external REST API: Random Beers and random Users (https://random-data-api.com)
- Store the user's details in the React context when logged in (https://react.dev/learn/passing-data-deeply-with-context)
- Health Check for the server (http://localhost:2022/health)
- Select the number of rows to display in the table

## Installation

In the root directory (it will run the client and the server automatically). Run:

```bash
npm i
npm run dev
```

Try editing the ts files to see the type checking in action, thanks to Trpc :)

## Building

```bash
npm run build
npm run start
```

## Printscreens

#### Main Screen

![video-demo-ter](https://github.com/user-attachments/assets/e040babe-1d37-4e24-bd8f-cf5c90be93dc)

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

![test-ter-terminal](https://github.com/user-attachments/assets/8c6a718b-b4ee-4938-a665-cfd118bdc46c)

#### Running the tests in Vscode

![test-ter-vscode](https://github.com/user-attachments/assets/d87b91ba-e7c8-4f60-ab17-1d61caa4f112)

## Thanks!

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
