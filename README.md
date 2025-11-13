# Favorite-Movies-TV-Shows-API
A simple RESTful service built with Node.js, Express, and Prisma/PostgreSQL to manage a list of favorite movies and TV shows.

Project Structure & Setup
Here is the suggested project structure:

favorite-media-api/
├── node_modules/
├── prisma/
│   ├── migrations/
│   │   └── <timestamp>_init/
│   │       └── migration.sql
│   ├── schema.prisma   <-- Database schema (Prisma model)
│   └── seed.js         <-- Database seeding script
├── src/
│   ├── config/
│   │   └── index.js      <-- Configuration (e.g., port)
│   ├── controllers/
│   │   └── entry.controller.js  <-- Business logic
│   ├── middlewares/
│   │   └── validation.middleware.js <-- Input validation
│   ├── models/
│   │   └── entry.model.js  <-- Data structure/Types (optional, can rely on Prisma)
│   ├── routes/
│   │   └── entry.routes.js      <-- Express routes
│   ├── services/
│   │   └── entry.service.js     <-- Database interaction (Prisma client)
│   ├── utils/
│   │   └── validationSchemas.js <-- Validation schemas (Zod/Joi)
│   └── app.js             <-- Main Express application setup
├── .env                  <-- Environment variables (Database URL)
├── .gitignore
├── package.json
└── README.md             <-- Submission Guide

## ⚙️ Technology Stack

* **Backend Framework:** Node.js, Express
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Schema Validation:** Zod

## 🛠️ Setup Instructions

### 1. Prerequisites

You must have **Node.js** and a running **PostgreSQL** database instance.

### 2. Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd favorite-media-api
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### 3. Database Configuration

1.  Create a file named `.env` in the root directory.
2.  Add your PostgreSQL connection string:

    ```env
    # .env
    DATABASE_URL="postgresql://user:password@localhost:5432/favorite_media_db?schema=public"
    PORT=3000
    ```

### 4. Database Schema/Migration

Apply the Prisma schema to your PostgreSQL database. This will create the `Entry` table.

```bash
npm run prisma:migrate

Initial sample data (2 Movies, 2 TV Shows)

```bash
npm run prisma:seed

Development mode

```bash
npm run dev
# Server will run on http://localhost:3000
