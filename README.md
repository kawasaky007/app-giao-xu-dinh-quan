# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## API Development Plan

This document outlines the plan to build a complete API backend for the parish website, replacing the current mock data system with a dynamic, database-driven backend using Next.js API Routes and Firebase.

### 1. Technology Stack

*   **API Framework:** [Next.js API Routes (App Router)](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
*   **Database:** [Cloud Firestore](https://firebase.google.com/docs/firestore) (as defined in `docs/backend.json`)
*   **Authentication:** [Firebase Authentication](https://firebase.google.com/docs/auth) with custom claims for role-based access control.
*   **Server-side Admin:** [Firebase Admin SDK for Node.js](https://firebase.google.com/docs/admin/setup)
*   **Data Validation:** [Zod](https://zod.dev/) (already in the project)

### 2. API Endpoint Structure

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


### 3. Implementation Steps

1.  **Firebase Admin Setup:**
    *   Configure the Firebase Admin SDK for server-side operations.
    *   Store service account credentials securely as an environment variable (`GOOGLE_APPLICATION_CREDENTIALS`).

2.  **API Route Implementation:**
    *   Create the folder structure for API routes under `src/app/api/`.
    *   For each resource (news, events, etc.), implement the Route Handlers (`GET`, `POST`, `PUT`, `DELETE` functions) that interact with Firestore.

3.  **Authentication & Authorization:**
    *   Create a utility function to verify the Firebase Auth ID token from the `Authorization` header in API requests.
    *   This function will also check for custom claims (`role: 'admin'` or `role: 'editor'`) to protect the admin endpoints.

4.  **Refactor Data Fetching Logic:**
    *   Update the functions in the `src/lib/` directory (`news.ts`, `events.ts`, etc.) to use `fetch` to call the new API endpoints instead of reading from local `.json` files.
    *   This will decouple the frontend components from the data source.

5.  **Connect Admin Forms:**
    *   Modify the `onSubmit` handlers in the admin forms (e.g., `ArticleForm`, `EventForm`) to make API calls to the corresponding `POST` (create) or `PUT` (update) endpoints.
    *   Implement user feedback mechanisms (e.g., toasts, loading states) for these operations.
