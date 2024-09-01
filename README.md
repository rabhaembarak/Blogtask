

# Blog Project

## Overview

This project is a blog management system with a Django backend and an Angular frontend.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- Django (v4.0 or higher)
- Angular CLI

### Setup

#### Backend (Django)

1. **Navigate to the `blogproject` directory:**

   For example, to include a Python code block:

```
cd blogproject
```
2.	Install Django and other dependencies:

```
pip install -r requirements.txt
```
3.	Run migrations to set up the database:

```
python manage.py migrate
```
4.	Start the Django development server:
```
python manage.py runserver
```
The backend server will be available at http://127.0.0.1:8000/.



Frontend (Angular)

1.	Navigate to the Angular project directory:
   ```
  cd src
```
2.	Install Angular dependencies:
```
npm install
```
3.	Start the Angular development server:
```
ng serve
```
The frontend application will be available at http://localhost:4200/.


Important Files and Directories

Backend (Django)

Models

	•	blogproject/blog/models.py
Defines the database models for the blog. Key components include:
	•	Blog: Represents a blog post with fields such as title, content, and author.
	•	Comment: Represents comments associated with a Blog.

Serializers

	•	blogproject/blog/serializers.py
Contains serializers for converting complex data types to JSON and vice versa. This file helps in serializing Blog and Comment models to JSON format and deserializing incoming data into Django models.


URLs

	•	blogproject/blogproject/urls.py
Configures URL routing for the Django project. It maps URL patterns to views, including:
	•	/getAll/: Endpoint to fetch all blog posts.
	•	/create/: Endpoint to create a new blog post.
	•	/delete/<int:id>/: Endpoint to delete a blog post by ID.
	•	/addComment/: Endpoint to add a comment to a blog post.

Frontend (Angular)

Components

	•	src/app/home/home.component.ts
Displays a list of blog posts. Fetches posts from the backend and handles user interactions such as submitting comments and opening the post creation dialog.
	•	src/app/create-post/create-post.component.ts
Provides a form for creating and editing blog posts. It uses Angular Material’s dialog for user interactions and communicates with the backend to save posts.
	•	src/app/login/login.component.ts
Manages user login functionality. Includes a form for users to enter their credentials and handles authentication.
	•	src/app/signup/signup.component.ts
Manages user registration functionality. Includes a form for new users to create an account and communicates with the backend to register users.

Services

	•	src/app/post.service.ts
Manages blog post operations. Contains methods for creating, fetching, and deleting blog posts. It communicates with the backend API endpoints.
	•	src/app/auth.service.ts
Handles authentication logic. Manages user login, logout, and token management.
	•	src/app/csrf.service.ts
Handles CSRF token retrieval and management to secure HTTP requests.

Routing

	•	src/app/app-routing.module.ts
Configures routing for the Angular application. Defines routes for components like home, login, signup, and post creation.


