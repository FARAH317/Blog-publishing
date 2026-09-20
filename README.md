# Blog Publishing Platform

## Description
A full-stack blog platform where users can register, log in, publish posts, edit or delete their own posts, browse and search all posts, and comment on them. Built as Task 1 of a Full Stack Development internship at InfozaTech.
## Features
- User registration and login
- JWT authentication
- Create blog posts
- Edit own posts
- Delete own posts
- Browse posts
- Search posts
- Comments
- MongoDB database
## Technologies
- React (Vite)
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
## Project Structure
```
backend/
  config/       MongoDB connection
  controllers/  Request/response logic
  middleware/   Auth guard and error handling
  models/       Mongoose schemas
  routes/       API endpoint definitions
  utils/        Small helpers (JWT signing)

frontend/
  src/api/          Axios instance with auth interceptor
  src/context/      Global auth state
  src/components/   Reusable UI pieces
  src/pages/        Route-level views
```
**frontend/.env**
```
VITE_API_URL=http://localhost:5000/api
```
## API Endpoints

| Method | Endpoint | Auth required | Description |
|---|---|---|---|
| POST | /api/auth/register | No | Create account |
| POST | /api/auth/login | No | Authenticate |
| GET | /api/auth/me | Yes | Current user |
| GET | /api/posts | No | List posts (`?search=`) |
| GET | /api/posts/:id | No | Single post |
| POST | /api/posts | Yes | Create post |
| PUT | /api/posts/:id | Yes (owner) | Edit post |
| DELETE | /api/posts/:id | Yes (owner) | Delete post |
| GET | /api/posts/:postId/comments | No | List comments |
| POST | /api/posts/:postId/comments | Yes | Add comment |
| DELETE | /api/comments/:commentId | Yes (owner) | Delete comment |
## Live Demo
_To be added after deployment._

## Author
Farah — [GitHub](https://github.com/FARAH317)
