# Event Management App

A full-stack web application for creating and joining events.

Users can create events, join them as visitors, and manage participation.  
The project includes a React frontend, a NestJS backend, and PostgreSQL database.

## Tech Stack

Frontend:
- React
- TypeScript
- Redux Toolkit
- TailwindCSS

Backend:
- NestJS
- TypeScript
- TypeORM

Database:
- PostgreSQL

Infrastructure:
- Docker
- Docker Compose

## Features

- User authentication
- Create, update and delete events
- Join and leave events
- Calendar view for subscribed events

## Running the project

### 1. Clone repository

git clone <repo-url>

cd Application

### 2. Run with Docker

docker compose up --build

To seed application with data, run:

docker exec -it events-backend npm run seed

### 3. Access applications

Frontend:
http://localhost:3000

Backend API:
http://localhost:5000

## Environment Variables

Backend requires the following variables:

PORT=5000
PGHOST=postgres
PGPORT=5432
PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=events
JWT_SECRET=secret
JWT_REFRESH_SECRET=moresecret
SALT_ROUNDS=12

Frontend requires the following variables:

VITE_API_URL=backend url

Copy `.env.example` to `.env` in each folder:

```bash
cp apps/backend/.env.example backend/.env
cp apps/frontend/.env.example frontend/.env
cp .env.example .env
```

## Database

PostgreSQL is used as the primary database.

The database is automatically initialized when running the project with Docker Compose.

## Project Structure

frontend/ – React application  
backend/ – NestJS API  
docker-compose.yml – service orchestration