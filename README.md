# 💰 Expense Management API - Day 8

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A comprehensive expense management REST API built with NestJS, MongoDB, and TypeScript featuring advanced features like budgets, recurring expenses, reports, and file uploads.</p>

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Database Seeding](#-database-seeding)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Troubleshooting](#-troubleshooting)

## ✨ Features

- 🔐 **Authentication & Authorization** - JWT-based auth with Passport
- 👤 **User Management** - User registration, login, and profile management
- 💵 **Expense Tracking** - Create, read, update, delete expenses
- 📁 **Category Management** - Organize expenses by categories
- 💳 **Budget Management** - Set and track monthly budgets per category
- 🔄 **Recurring Expenses** - Automate recurring payments (daily, weekly, monthly)
- 📊 **Reports & Analytics** - Generate expense summaries and insights
- 📤 **File Uploads** - Upload receipt images with Multer
- 📘 **API Documentation** - Interactive Swagger/OpenAPI docs
- ✅ **Validation** - Global DTO validation with class-validator
- 🌐 **CORS Enabled** - Ready for frontend integration
- 📝 **Logging** - HTTP request logging with Morgan

## 🛠 Tech Stack

- **Framework**: NestJS 11.x
- **Language**: TypeScript 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + Passport
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **File Upload**: Multer
- **Logging**: Morgan
- **Password Hashing**: bcryptjs
- **Scheduling**: @nestjs/schedule (for recurring jobs)

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- **MongoDB** (v6.x or higher) - Running locally or MongoDB Atlas

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd expense-management-api-day8
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Install Additional Required Packages

The following packages were installed to fix TypeScript errors and add features:

```bash
# Type definitions
npm install --save-dev @types/multer @types/morgan

# Core dependencies
npm install morgan @nestjs/swagger swagger-ui-express
```

**Complete list of installed packages:**

**Production Dependencies:**
- `@nestjs/common` - NestJS core functionality
- `@nestjs/core` - NestJS core module
- `@nestjs/config` - Configuration management
- `@nestjs/jwt` - JWT authentication
- `@nestjs/mongoose` - MongoDB integration
- `@nestjs/passport` - Authentication strategies
- `@nestjs/platform-express` - Express platform adapter
- `@nestjs/schedule` - Cron jobs and scheduling
- `@nestjs/swagger` - API documentation
- `bcryptjs` - Password hashing
- `class-transformer` - Object transformation
- `class-validator` - DTO validation
- `mongoose` - MongoDB ODM
- `multer` - File upload handling
- `morgan` - HTTP request logger
- `passport` - Authentication middleware
- `passport-jwt` - JWT strategy for Passport
- `swagger-ui-express` - Swagger UI

**Development Dependencies:**
- `@types/bcryptjs` - TypeScript types for bcryptjs
- `@types/express` - TypeScript types for Express
- `@types/multer` - TypeScript types for Multer
- `@types/morgan` - TypeScript types for Morgan
- `@types/passport-jwt` - TypeScript types for Passport JWT
- `typescript` - TypeScript compiler
- `@nestjs/cli` - NestJS CLI tools
- `@nestjs/testing` - Testing utilities

## ⚙️ Environment Setup

### Step 1: Create `.env` File

Create a `.env` file in the root directory:

```bash
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/expense_day8

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# File Upload Configuration (Optional)
MAX_FILE_SIZE=5242880
```

### Step 2: Update Environment Variables

Replace the placeholder values with your actual configuration:

- `JWT_SECRET`: Use a strong, random secret key
- `MONGO_URI`: Update if using MongoDB Atlas or different connection string

## 🗄️ Database Seeding

To populate the database with sample data:

```bash
# Run the seed script
npm run build
node dist/scripts/seed.js
```

**Seed data includes:**
- Demo user: `demo@example.com` / `secret123`
- Sample categories (Food, Travel)
- Sample expenses

## 🏃 Running the Application

### Development Mode (with hot-reload)

```bash
npm run start:dev
```

### Production Mode

```bash
# Build the project
npm run build

# Start production server
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

**Server will start on:**
- API: `http://localhost:5000/api/v1`
- Swagger Docs: `http://localhost:5000/api/docs`

## 📘 API Documentation

Once the server is running, access the interactive Swagger documentation:

```
http://localhost:5000/api/docs
```

Features:
- ✅ Try out all API endpoints
- ✅ View request/response schemas
- ✅ Test authentication with Bearer token
- ✅ See all available DTOs and models

### 📦 Demo Data & Postman Collection

**Demo Data File**: `demo-data.json`
- Contains sample users, categories, expenses, budgets, and recurring expenses
- Includes all request examples and testing steps
- Payment methods and cadence options reference

**Postman Collection**: `Expense-API.postman_collection.json`
- Import this file into Postman for easy API testing
- Pre-configured requests for all endpoints
- Auto-saves JWT token after login
- Variables for categoryId, expenseId, budgetId

**How to use Postman Collection:**
1. Open Postman
2. Click Import → Upload Files
3. Select `Expense-API.postman_collection.json`
4. Run "Signup" or "Login" request first
5. Token will be automatically saved
6. Test other endpoints with saved token

## 📁 Project Structure

```
src/
├── auth/                      # Authentication module
│   ├── auth.controller.ts     # Auth endpoints (signup, login)
│   ├── auth.service.ts        # Auth business logic
│   ├── auth.module.ts         # Auth module configuration
│   └── jwt.strategy.ts        # JWT validation strategy
├── decorators/                # Custom decorators
│   └── get-user.decorator.ts  # Extract user from request
├── guards/                    # Route guards
│   └── jwt-auth.guard.ts      # JWT authentication guard
├── pages/                     # Feature modules
│   ├── budgets/               # Budget management
│   ├── categories/            # Category management
│   ├── expenses/              # Expense tracking
│   ├── recurring-expenses/    # Recurring expenses
│   │   ├── recurring-job.service.ts  # Cron job service
│   │   └── ...
│   ├── reports/               # Analytics & reports
│   ├── uploads/               # File upload handling
│   └── users/                 # User management
├── scripts/                   # Utility scripts
│   ├── seed.ts                # Database seeding
│   └── run-recurring-once.ts  # Manual recurring job trigger
├── app.module.ts              # Root application module
├── app.controller.ts          # Root controller
├── app.service.ts             # Root service
└── main.ts                    # Application entry point
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/signup` | Register new user | ❌ |
| POST | `/api/v1/auth/login` | Login user | ❌ |

### Users

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/users/profile` | Get current user profile | ✅ |

### Categories

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/categories` | Create category | ✅ |
| GET | `/api/v1/categories` | Get all categories | ✅ |
| PUT | `/api/v1/categories/:id` | Update category | ✅ |
| DELETE | `/api/v1/categories/:id` | Delete category | ✅ |

### Expenses

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/expenses` | Create expense | ✅ |
| GET | `/api/v1/expenses` | Get all expenses | ✅ |
| GET | `/api/v1/expenses/:id` | Get expense by ID | ✅ |
| PUT | `/api/v1/expenses/:id` | Update expense | ✅ |
| DELETE | `/api/v1/expenses/:id` | Delete expense | ✅ |

### Budgets

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/budgets` | Create budget | ✅ |
| GET | `/api/v1/budgets?month=YYYY-MM` | Get budgets by month | ✅ |
| PUT | `/api/v1/budgets/:id` | Update budget | ✅ |
| DELETE | `/api/v1/budgets/:id` | Delete budget | ✅ |

### Recurring Expenses

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/recurring-expenses` | Create recurring expense | ✅ |
| GET | `/api/v1/recurring-expenses` | Get all recurring expenses | ✅ |
| PUT | `/api/v1/recurring-expenses/:id` | Update recurring expense | ✅ |
| DELETE | `/api/v1/recurring-expenses/:id` | Delete recurring expense | ✅ |

### Reports

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/v1/reports/summary?month=YYYY-MM` | Get expense summary | ✅ |

### Uploads

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/uploads/receipt` | Upload receipt image | ✅ |

## 🔧 Troubleshooting

### Port Already in Use Error

If you see `EADDRINUSE: address already in use :::5000`:

```bash
# Windows - Kill all Node processes
taskkill /F /IM node.exe

# Or change the port in .env file
PORT=3000
```

### MongoDB Connection Error

1. Ensure MongoDB is running:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

2. Check connection string in `.env` file
3. For MongoDB Atlas, ensure IP whitelist is configured

### TypeScript Compilation Errors

```bash
# Clean build
npm run build

# If errors persist, delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Module Not Found Errors

```bash
# Reinstall all dependencies
npm install

# Install missing types
npm install --save-dev @types/multer @types/morgan
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start application |
| `npm run start:dev` | Start with hot-reload |
| `npm run start:prod` | Start production build |
| `npm run build` | Build TypeScript to JavaScript |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🔐 Authentication Flow

1. **Signup**: POST `/api/v1/auth/signup` with user details
2. **Login**: POST `/api/v1/auth/login` to get JWT token
3. **Use Token**: Add `Authorization: Bearer <token>` header to protected routes

## 👨‍💻 Developer

**Maruf Hossain**

## 📄 License

This project is [MIT licensed](LICENSE).

## 🙏 Acknowledgments

- Built with [NestJS](https://nestjs.com/)
- Database: [MongoDB](https://www.mongodb.com/)
- Documentation: [Swagger/OpenAPI](https://swagger.io/)
