<div align="center">
<img src="https://github.com/user-attachments/assets/cc3cc768-9ee4-4c9b-b108-4c0979acbee8" alt="image" width="300"/>
<br />
<strong>T</strong>rpc <strong>E</strong>xpress <strong>R</strong>eact

</div>

<h1 align="center"><strong>Boilerplate for a Fullstack App</strong></h1>

## Stack

TER

```
React https://reactjs.org/ (A JavaScript library for building user interfaces.)
Trpc https://trpc.io/ (End-to-end typesafe APIs made easy.)
Express https://expressjs.com/ (Fast, unopinionated, minimalist web framework for node.)
```

Tailwind CSS https://tailwindcss.com/ (A utility-first CSS framework for rapid UI development.)
TypeScript https://www.typescriptlang.org/ (TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.)

## Explanation

https://app.usebubbles.com/k4KLnyPKrTrp7BmCftu8b9/explanation

## Installation

### create a `.env` file in the `server` directory with the following content:

```
CHECKR_PAY_ACCESS_KEY=XXXXXXXXXXXXXXXXXXXX
CHECKR_PAY_SECRET_KEY=XXXXXXXXXXXXXXXXXXXX
```

### In localhhost, in the root directory (it will run the client and the server automatically). Run:

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

## Docker

You can run the server only with docker by going into the `server` directory and running:

```bash
docker compose up --build
```

## Todo

- Create unit tests for the server and client
- Securize the backend. (Auth & permissions)

User story

User application.

- be able to pay the worker
  - in cent.
  - User will be ased to input the amount. In $.
- select worker form the table and retrive all the payouts

bonus

-
