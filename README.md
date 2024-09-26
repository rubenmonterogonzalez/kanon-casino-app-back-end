# Casino App Backend - Node.js + TypeScript + Prisma

### Description

This project is a backend API for the Casino web application. It is built using Node.js, Express, TypeScript, and Prisma for database interactions. The API handles user authentication, slot machine game operations, and coin persistence.

## Table of Contents

1.  [Features](#features)
2.  [Tech Stack](#tech-stack)
3.  [Installation](#installation)
4.  [Development](#development)
5.  [Build and Deployment](#build-and-deployment)
6.  [Folder Structure](#folder-structure)
7.  [Environment Variables](#environment-variables)
8.  [Testing](#testing)
9.  [ESLint and Prettier Configuration](#eslint-and-prettier-configuration)
10. [Useful Commands](#useful-commands)

## Features

- User authentication using JWT.
- Slot machine game simulation and coin management.
- Integration with a MySQL database using Prisma ORM.
- Comprehensive testing using Jest and Supertest.

## Tech Stack

### Backend

- **Node.js 18.x**
- **Express 4.x**
- **TypeScript 5.6**
- **Prisma 5.19**
- **JWT for authentication**

### Development Tools

- **Nodemon**: For auto-reloading during development.
- **Jest**: For unit testing.
- **Supertest**: For API endpoint testing.

## Installation

1.  Clone the repository:
    ```
    git clone https://github.com/rubenmonterogonzalez/kanon-casino-app-back-end.git
    cd kanon-casino-app-back-end
    ```
2.  Install dependencies:  
    `npm install`
3.  Create a .env file in the root directory and add the following:
    ```
    DATABASE_URL=mysql://USER:PASSWORD@localhost:3306/casino_db
    JWT_SECRET=your_jwt_secret
    ```
    Replace USER, PASSWORD, and casino_db with your MySQL database credentials.
4.  Run the Prisma migration to set up your database schema:
    `npx prisma migrate dev --name init`

## Development

To start the development server with auto-reloading, run:

`npm run dev `

This will start the Express server at http://localhost:3001.

### Available Scripts

- **npm run dev**: Start the development server with Nodemon.
- **npm run test**: Run unit tests using Jest.
- **npm run migrate**: Run Prisma migrations.
- **npm run generate**: Generate Prisma client after modifying schema.

## Build and Deployment

To build the project for production, run:
`npm run build `

This will compile your TypeScript files into JavaScript in the dist folder. You can then deploy this folder to your server of choice, such as AWS, Heroku, or DigitalOcean.

## Folder Structure

```
├── prisma                     # Prisma schema and migration files
│   ├── migrations             # Prisma migration files
│   └── schema.prisma          # Prisma schema
├── src
│   ├── controllers            # Express controllers for handling requests
│   ├── data                   # games-data.json
│   ├── middleware             # Custom middleware functions
│   ├── models                 # Database models used
│   ├── routes                 # Express route definitions
│   ├── services               # Business logic and service functions
│   ├── test                   # Unit and integration tests
│   ├── types                  # Custom TypeScript types
│   ├── utils                  # Utility functions and helpers
│   └── index.ts               # Entry point for the server
├── .env                       # Environment variables
├── .eslintrc.js               # ESLint
├── .gitignore                 # Files to ignore in Git
├── .prettierrc                # Prettier config
├── package.json               # NPM scripts and dependencies
├── tsconfig.json              # TypeScript configuration
└── README.md                  # This file
```

## Environment Variables

The following environment variables are used in this project:

- DATABASE_URL: The URL of your MySQL database.
- JWT_SECRET: Secret key used for JWT signing.

You can add more environment variables as needed in your .env file.

## Testing

To run unit tests using Jest and Supertest, use:

`npm run test `

This will execute all test files located in the tests directory that match the pattern \*.test.ts.

## ESLint and Prettier Configuration

The project is configured with ESLint and Prettier for code quality and formatting. The configuration includes recommended rules for TypeScript and Node.js development.

### ESLint Configuration (eslintrc.js):

```
export const env = {
  commonjs: true,
  es2021: true,
  node: true,
};

export const overrides = [
  {
    env: {
      node: true,
    },
    files: [".eslintrc.js"],
    parserOptions: {
      sourceType: "script",
    },
  },
];

export const parserOptions = {
  ecmaVersion: 2021,
};

export const rules = {
  indent: ["error", 2],
  "no-tabs": "off",
  "no-trailing-spaces": "error",
  quotes: ["error", "double"],
  semi: ["error", "always"],
  "no-unused-vars": "error",
};
```

### Prettier Configuration (.prettierrc):

```
{
    "endOfLine": "lf",
  "singleQuote": true,
  "trailingComma": "es5"
}
```

## Useful Commands

- **Start Development Server**: npm run dev
- **Run Migrations**: npm run migrate
- **Generate Prisma Client**: npm run generate
- **Run Tests**: npm run test

## Additional Resources

- [Express Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Prisma Documentation](https://www.prisma.io/)
- [Jest Documentation](https://jestjs.io/)
