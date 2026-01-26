# Frontend - React App

This folder contains the React frontend for the Project & Task Management app.

## Features

- Project and Task management UI
- Reusable modals for creating projects and tasks
- Axios service layer for API calls
- JWT authentication
- Toast notifications for success/failure
- React Router v7 for navigation

## Tech Stack

- React + TypeScript
- React Router v7
- Axios
- React Toastify

## Setup Instructions

1. Install dependencies:

```bash
npm install
```

2. Create .env file:
  ```bash
  VITE_API_URL=http://localhost:8000
  ```
3. Start development server:
  ```bash
  npm run dev
  ```
## Project Structure

```bash
frontend/
├─ src/
│  ├─ components/
│  ├─ pages/   
│  ├─ thunk.ts 
│  └─ App.tsx
```
## Usage

- Log in or sign up
- Create a project
- Add tasks to the project
- Update task status
- Toast notifications indicate success/failure