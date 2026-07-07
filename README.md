This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

----
## PROJECT OVERVIEW
 **Calories-tracker** is a web application designed to help users monitor and track their daily calorie intake.

### key features
 - **Authentication/login system:** A secure login and sign-up section for new users that validates the fields filled by user.
 - **Main dashboard:** An interface displaying a visual gauge at the top as an indicator for quick calorie tracking, accompanied by a macronutrient indicator(protein, carbohydrates and fats).
 - **Meal Management:** Located in the section below, dedicated to adding or deleting products, where user can log specific food and adjust portions for accurate macronutrient counting.

 ---

 ## Tools 
 * Figma
 * Git & Github
 * React and Next.js
 * Prisma
 * SQLite

 ## Project Setup

The project was created using Next.js with the App Router:

```bash
npx create-next-app@latest


The application structure was organized into sections such as login, register, and dashboard. The development started with the frontend implementation, followed by backend integration and database configuration.

Prisma and SQLite were used for database management. The database structure was defined in schema.prisma, and migrations were used to manage database changes. API routes were implemented to connect the frontend with the backend.

During development, AI was used as a learning support tool to analyze possible solutions, understand new functionalities, review documentation, and troubleshoot errors while implementing features.

## How to Run the Project

1. Clone the repository:

```bash
git clone <repository-url>
Install dependencies:
npm install
Configure the database using Prisma migrations:
npx prisma migrate dev
Start the development server:
npm run dev
Open the application:
http://localhost:3000/login

The application will be ready to use. Users can register, log in, and start tracking their meals and nutritional information.

