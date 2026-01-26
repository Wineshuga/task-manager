# Backend - Django API

This folder contains the Django backend for the Project & Task Management app.

## Features

- User authentication (JWT)
- Projects and Tasks CRUD
- Optional due_date field for tasks
- PostgreSQL database
- REST API endpoints

## Tech Stack

- Django
- Django REST Framework
- PostgreSQL

## Setup Instructions

1. Create virtual environment:

    ```bash
    python -m venv venv
    source venv/bin/activate  # Linux/macOS
    venv\Scripts\activate     # Windows
    ```

2. Install Dependencies

    ```bash
    pip install -r requirements.txt
    ```

3. Configure .env with database credentials, secret key, etc.
    ```bash
    cp .env_example .env
    ```

4. Run migrations:
    ```bash
    python manage.py migrate
    ```
5. Start server:
   ```bash
   python manage.py runserver
   ```

## API Endpoints
- `POST /api/auth/login/` - Login
- `POST /api/auth/signup/` - Signup
- `GET /api/projects/` - List projects
- `POST /api/projects/` - Create project
- `GET /api/projects/<id>/tasks/` - List tasks in a project
- `POST /api/projects/<id>/tasks/` - Create task
- `PATCH /api/projects/<id>/tasks/<id>/` - Update task

## Project Structure
```bash
backend/
├─ projects/      # Project and Task models, serializers, views
├─ users/         # User auth models, serializers, views
└─ config
```