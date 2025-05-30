# Ping Me

A full-stack application built with NestJS (backend) and Next.js (frontend).

## Prerequisites

Before you begin, ensure you have the following installed:

-   Node.js (v18 or higher)
-   npm (comes with Node.js)
-   Git

## Project Structure

The project is divided into two main directories:

-   `client/`: Next.js frontend application
-   `server/`: NestJS backend application

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd ping-me
```

### 2. Server Setup (NestJS)

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env file with your configuration

# Run database migrations
npx prisma migrate dev

# Build the application
npm run build
```

### 3. Client Setup (Next.js)

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env file with your configuration
```

## Running the Application

### Start the Server

```bash
# In the server directory
cd server
npm run start:dev
```

The server will start on `http://localhost:3000` by default.

### Start the Client

```bash
# In the client directory
cd client
npm run dev
```

The client application will be available at `http://localhost:3001`.

## Development

### Server (NestJS)

-   `npm run start:dev`: Start the server in development mode with hot-reload
-   `npm run build`: Build the application
-   `npm run start:prod`: Start the production server
-   `npm run test`: Run tests
-   `npm run lint`: Run linting

### Client (Next.js)

-   `npm run dev`: Start the development server
-   `npm run build`: Build the application
-   `npm run start`: Start the production server
-   `npm run lint`: Run linting

## Environment Variables

### Server (.env)

Required environment variables for the server:

-   `DATABASE_URL`: Your database connection string
-   `JWT_SECRET`: Secret key for JWT token generation
-   Other environment variables as specified in .env.example

### Client (.env)

Required environment variables for the client:

-   `NEXT_PUBLIC_API_URL`: Backend API URL
-   Other environment variables as specified in .env.example

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

[MIT License](LICENSE)
