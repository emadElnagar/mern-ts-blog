# MERN Blog Application

## Description
A full-stack blog application built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to create, read, update, and delete blog posts, categorize them, leave comments, and manage user accounts.

## Features
* User authentication (registration, login, logout)
* Create, read, update, and delete blog posts
* Category management for posts
* Commenting on posts
* User profiles
* Admin panel for content moderation (if applicable)
* Responsive design

## Technologies Used
* **Frontend:**
    * React
    * TypeScript
    * Vite
    * CSS
    * Redux Toolkit (for state management)
    * React Router (for navigation)
* **Backend:**
    * Node.js
    * Express.js
    * TypeScript
    * MongoDB (Database)
    * Mongoose (ODM)
    * JWT (for authentication)
    * Multer (for file uploads)
    * bcrypt.js (for password hashing)
* **Other:**
    * Git
    * npm/yarn

## Setup and Installation

### Prerequisites
* Node.js (v18.17.1 or higher)
* npm (v9.6.7 or higher)
* yarn (v1.22.19 or higher)
* MongoDB Atlas account or local MongoDB installation

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd mern-blog/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or yarn install
   ```
3. Create a `.env` file in the `backend` directory and add the following environment variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
   * Replace `your_mongodb_connection_string` with your MongoDB connection URI.
   * Replace `your_jwt_secret_key` with a strong, random secret key.
4. Run the backend server:
   ```bash
   npm run dev
   # or yarn dev
   ```
   The backend server will run on `http://localhost:5000` (or the PORT you specified).

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or yarn install
   ```
3. Create a `.env.local` file in the `frontend` directory and add the following environment variables:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
   * Replace `http://localhost:5000/api` with the base URL of your backend API.
4. Run the frontend development server:
   ```bash
   npm run dev
   # or yarn dev
   ```
   The frontend application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Usage
Register a new user account, log in, and start creating blog posts. Explore different categories and comment on existing posts.

## API Endpoints (Backend)
* `POST /api/users/register` - Register a new user
* `POST /api/users/login` - Log in a user
* `GET /api/posts` - Get all posts
* `POST /api/posts` - Create a new post
* `GET /api/posts/:id` - Get a single post by ID

## Contributing
[Guidelines for contributing to the project, if applicable.]

## License
[Your project's license information, e.g., MIT License.]

## Acknowledgements
[Credit any resources, libraries, or individuals that significantly contributed to the project.]
