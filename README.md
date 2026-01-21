# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## API Development Plan

This document outlines the plan to build a complete API backend for the parish website. This plan uses a standard relational database approach with Next.js, replacing the current mock data system with a dynamic, database-driven backend.

### 1. Technology Stack

*   **API Framework:** [Next.js API Routes (App Router)](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
*   **Database:** [PostgreSQL](https://www.postgresql.org/)
*   **ORM:** [Prisma](https://www.prisma.io/) for type-safe database access.
*   **Authentication:** [Next-Auth.js (Auth.js)](https://next-auth.js.org/) for handling user sessions and role-based access control.
*   **Data Validation:** [Zod](https://zod.dev/) (already in the project).

### 2. Data Models & Schema

The data models and entities for the application (e.g., `NewsArticle`, `Event`) are already defined in `docs/backend.json`. These definitions will serve as the source of truth for generating the database schema using Prisma (`prisma/schema.prisma`).

### 3. API Endpoint Structure

All API routes will be located under `src/app/api/`.

#### Public Endpoints (Read-only)

These endpoints will be publicly accessible to fetch data for the website.

| Method | Endpoint                    | Description                                       |
| :----- | :-------------------------- | :------------------------------------------------ |
| `GET`  | `/api/news`                 | Get all published articles (supports filtering)   |
| `GET`  | `/api/news/[slug]`          | Get a single article by slug                      |
| `GET`  | `/api/events`               | Get all upcoming and past events                  |
| `GET`  | `/api/events/[slug]`        | Get a single event by slug                        |
| `GET`  | `/api/faq`                  | Get all frequently asked questions                |
| `GET`  | `/api/gallery/albums`       | Get all photo albums                              |
| `GET`  | `/api/gallery/albums/[slug]`| Get a single photo album with its image list      |
| `GET`  | `/api/gallery/videos`       | Get all videos                                    |
| `GET`  | `/api/resources/documents`  | Get all documents (bulletins, forms)              |
| `GET`  | `/api/resources/sermons`    | Get all sermons                                   |
| `POST` | `/api/contact`              | Submit a contact form                             |


#### Admin Endpoints (Protected)

These endpoints will require authentication and appropriate roles (e.g., `editor`, `admin`) to perform create, update, and delete (CUD) operations.

| Resource  | Endpoints                               | Operations Supported                      |
| :-------- | :-------------------------------------- | :---------------------------------------- |
| **News**      | `/api/admin/news` <br/> `/api/admin/news/[id]` | `GET (all)`, `POST`, `PUT`, `DELETE`      |
| **Events**    | `/api/admin/events` <br/> `/api/admin/events/[id]` | `GET (all)`, `POST`, `PUT`, `DELETE`      |
| **FAQs**      | `/api/admin/faq` <br/> `/api/admin/faq/[id]` | `GET (all)`, `POST`, `PUT`, `DELETE`      |
| **Albums**    | `/api/admin/albums` <br/> `/api/admin/albums/[id]` | `GET (all)`, `POST`, `PUT`, `DELETE`      |
| **Videos**    | `/api/admin/videos` <br/> `/api/admin/videos/[id]` | `GET (all)`, `POST`, `PUT`, `DELETE`      |
| **Users**     | `/api/admin/users` <br/> `/api/admin/users/[id]` | `GET (all)`, `PUT` (for roles)              |
| **Submissions** | `/api/admin/contact`                  | `GET (all)`, `DELETE`                       |


### 4. Implementation Steps

1.  **Prisma Setup:**
    *   Initialize Prisma in the project.
    *   Generate the Prisma schema (`prisma/schema.prisma`) based on the entity definitions in `docs/backend.json`.
    *   Set up the Prisma Client. A `DATABASE_URL` environment variable will be required in the `.env` file to connect to the PostgreSQL database.

2.  **Authentication Setup (Next-Auth.js):**
    *   Configure Next-Auth.js with a Credentials Provider for email/password login.
    *   Use a JWT (JSON Web Token) session strategy.
    *   Extend the Next-Auth session and token callbacks to include user roles (e.g., `admin`, `editor`) for authorization.

3.  **API Route Implementation:**
    *   Create the folder structure for API routes under `src/app/api/`.
    *   For each resource (news, events, etc.), implement the Route Handlers (`GET`, `POST`, `PUT`, `DELETE` functions) that use the Prisma Client to interact with the database.

4.  **Protect Admin Routes:**
    *   Create a utility function or a Next.js Middleware to verify the user's session and role from the JWT token on incoming requests to the `/api/admin/*` endpoints.

5.  **Refactor Data Fetching Logic:**
    *   Update the functions in the `src/lib/` directory (`news.ts`, `events.ts`, etc.) to use `fetch` to call the new API endpoints instead of reading from local `.json` files.

6.  **Connect Admin Forms:**
    *   Modify the `onSubmit` handlers in the admin forms (e.g., `ArticleForm`, `EventForm`) to make API calls to the corresponding `POST` (create) or `PUT` (update) endpoints, including sending the authentication token.
    *   Implement user feedback mechanisms (e.g., toasts, loading states) for these operations.

---

### AI Prompt for API Generation

You can use the following prompt with a capable AI coding assistant to generate the necessary API code based on this plan.

````
Act as a professional full-stack developer. Your task is to implement a complete backend API for my Next.js application based on the plan outlined in my `README.md` file and the data models defined in `docs/backend.json`.

**Technology Stack to Use:**
- API Framework: Next.js API Routes (App Router)
- Database: PostgreSQL
- ORM: Prisma
- Authentication: Next-Auth.js (Auth.js)
- Data Validation: Zod

**Detailed Steps:**

1.  **Install Dependencies:** Add `prisma`, `@prisma/client`, and `next-auth` to the `package.json` file.
2.  **Prisma Schema Generation:**
    *   Create a `prisma/schema.prisma` file.
    *   Read the entity definitions from `docs/backend.json` (`UserProfile`, `NewsArticle`, `Event`, etc.).
    *   Translate these JSON schema definitions into Prisma models. Define relations where appropriate (e.g., a `User` can be an `author` of a `NewsArticle`).
    *   Ensure the schema includes a `User` model with fields for `email`, `password` (hashed), and `role` (e.g., `ADMIN`, `EDITOR`, `USER`).
3.  **Prisma Client:** Create a singleton instance of the Prisma client (e.g., in `src/lib/prisma.ts`) to be reused across the application.
4.  **Authentication with Next-Auth.js:**
    *   Create the dynamic route file `src/app/api/auth/[...nextauth]/route.ts`.
    *   Configure Next-Auth with a **Credentials Provider** for email and password login. You will need to handle password hashing (using a library like `bcrypt`) during user registration and password comparison during login.
    *   Use a **JWT session strategy**.
    *   In the `callbacks` object, modify the `jwt` and `session` callbacks to include the user's `id` and `role` in the token and session objects so this data is available for authorization checks.
5.  **API Route Implementation:**
    *   For each resource defined in the "API Endpoint Structure" table in the `README.md` (news, events, etc.), create the corresponding Next.js Route Handler files under `src/app/api/`.
    *   **Public Routes (`/api/news`, `/api/events`, etc.):** Implement the `GET` handlers to fetch data from the database using your Prisma client.
    *   **Admin Routes (`/api/admin/news`, etc.):**
        *   Before executing any logic, protect these routes by checking for a valid session and the required user role (`ADMIN` or `EDITOR`) from the Next-Auth token. If the user is not authorized, return a 403 Forbidden error.
        *   Implement the `GET`, `POST`, `PUT`, and `DELETE` handlers using the Prisma client.
        *   Use Zod to validate incoming request bodies for `POST` and `PUT` requests.
6.  **Refactor Data Fetching:**
    *   Go through the files in `src/lib/` (e.g., `news.ts`, `events.ts`).
    *   Rewrite the functions (`getNewsArticles`, `getEventBySlug`, etc.) to `fetch` data from your newly created public API endpoints instead of reading from the local `.json` files. The local `.json` data files are now deprecated and can be ignored.
````
