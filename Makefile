# Makefile for Recipe Manager Application
# This file contains common tasks for development, testing, and deployment
#
# Usage: make <target>
# Example: make dev

.PHONY: help setup install dev stop clean migrate test-backend test-frontend test lint logs shell-backend shell-db

# Default target - show help
help:
	@echo "Recipe Manager - Available Make Targets"
	@echo "========================================"
	@echo ""
	@echo "Setup & Installation:"
	@echo "  make setup           - Initial project setup (create .env, prepare directories)"
	@echo "  make install         - Install all dependencies (frontend & backend)"
	@echo ""
	@echo "Development:"
	@echo "  make dev             - Start all services with Docker Compose"
	@echo "  make stop            - Stop all running services"
	@echo "  make restart         - Restart all services"
	@echo "  make logs            - View logs from all services"
	@echo ""
	@echo "Database:"
	@echo "  make migrate         - Run database migrations"
	@echo "  make migrate-create  - Create a new migration"
	@echo "  make shell-db        - Open PostgreSQL shell"
	@echo ""
	@echo "Testing:"
	@echo "  make test            - Run all tests (backend & frontend)"
	@echo "  make test-backend    - Run backend tests only"
	@echo "  make test-frontend   - Run frontend tests only"
	@echo ""
	@echo "Code Quality:"
	@echo "  make lint            - Run linters for both frontend and backend"
	@echo "  make format          - Format code (black for Python, prettier for JS/TS)"
	@echo ""
	@echo "Utilities:"
	@echo "  make shell-backend   - Open a shell in the backend container"
	@echo "  make clean           - Clean up containers, volumes, and cache files"
	@echo "  make reset           - Complete reset (clean + setup)"
	@echo ""

# Initial setup - create necessary files and directories
setup:
	@echo "Setting up Recipe Manager project..."
	@if [ ! -f .env ]; then \
		if [ -f .env.example ]; then \
			cp .env.example .env; \
			echo "Created .env from .env.example"; \
		else \
			echo "DB_HOST=localhost" > .env; \
			echo "DB_PORT=5432" >> .env; \
			echo "DB_NAME=recipe_db" >> .env; \
			echo "DB_USER=recipe_user" >> .env; \
			echo "DB_PASSWORD=recipe_password" >> .env; \
			echo "ENVIRONMENT=development" >> .env; \
			echo "Created default .env file"; \
		fi \
	else \
		echo ".env file already exists"; \
	fi
	@echo "Setup complete!"

# Install all dependencies
install:
	@echo "Installing dependencies..."
	@if [ -d "backend" ]; then \
		echo "Installing backend dependencies..."; \
		cd backend && python -m venv venv && . venv/bin/activate && pip install -r requirements.txt; \
	else \
		echo "Backend directory not found. Skipping backend installation."; \
	fi
	@if [ -d "frontend" ]; then \
		echo "Installing frontend dependencies..."; \
		cd frontend && npm install; \
	else \
		echo "Frontend directory not found. Skipping frontend installation."; \
	fi
	@echo "Dependencies installed!"

# Start all services
dev:
	@echo "Starting all services with Docker Compose..."
	docker-compose up -d
	@echo ""
	@echo "Services are starting up!"
	@echo "Frontend:  http://localhost:3000"
	@echo "Backend:   http://localhost:8000"
	@echo "API Docs:  http://localhost:8000/docs"
	@echo ""
	@echo "Run 'make logs' to view logs"

# Stop all services
stop:
	@echo "Stopping all services..."
	docker-compose down

# Restart all services
restart: stop dev

# View logs from all services
logs:
	docker-compose logs -f

# Run database migrations
migrate:
	@echo "Running database migrations..."
	@if [ -d "backend" ]; then \
		docker-compose exec backend alembic upgrade head; \
	else \
		echo "Backend directory not found. Cannot run migrations."; \
	fi

# Create a new database migration
migrate-create:
	@echo "Creating new migration..."
	@read -p "Enter migration message: " message; \
	docker-compose exec backend alembic revision --autogenerate -m "$$message"

# Run all tests
test: test-backend test-frontend

# Run backend tests
test-backend:
	@echo "Running backend tests..."
	@if [ -d "backend" ]; then \
		docker-compose exec backend pytest -v; \
	else \
		echo "Backend directory not found. Cannot run tests."; \
	fi

# Run frontend tests
test-frontend:
	@echo "Running frontend tests..."
	@if [ -d "frontend" ]; then \
		docker-compose exec frontend npm test; \
	else \
		echo "Frontend directory not found. Cannot run tests."; \
	fi

# Run linters
lint:
	@echo "Running linters..."
	@if [ -d "backend" ]; then \
		echo "Linting backend..."; \
		docker-compose exec backend flake8 .; \
	fi
	@if [ -d "frontend" ]; then \
		echo "Linting frontend..."; \
		docker-compose exec frontend npm run lint; \
	fi

# Format code
format:
	@echo "Formatting code..."
	@if [ -d "backend" ]; then \
		echo "Formatting backend with black..."; \
		docker-compose exec backend black .; \
	fi
	@if [ -d "frontend" ]; then \
		echo "Formatting frontend with prettier..."; \
		docker-compose exec frontend npm run format; \
	fi

# Open a shell in the backend container
shell-backend:
	docker-compose exec backend /bin/bash

# Open a PostgreSQL shell
shell-db:
	docker-compose exec db psql -U recipe_user -d recipe_db

# Clean up everything
clean:
	@echo "Cleaning up..."
	docker-compose down -v
	@if [ -d "backend/__pycache__" ]; then rm -rf backend/__pycache__; fi
	@if [ -d "backend/.pytest_cache" ]; then rm -rf backend/.pytest_cache; fi
	@if [ -d "frontend/.next" ]; then rm -rf frontend/.next; fi
	@if [ -d "frontend/node_modules" ]; then rm -rf frontend/node_modules; fi
	@echo "Cleanup complete!"

# Complete reset
reset: clean setup
	@echo "Project reset complete!"
