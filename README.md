# Favorite-Movies-TV-Shows-API
A simple RESTful service built with Node.js, Express, and Prisma/PostgreSQL to manage a list of favorite movies and TV shows.

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
