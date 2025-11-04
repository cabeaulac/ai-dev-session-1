# Introduction to Agentic Programming with Claude Code

Welcome to this hands-on tutorial for learning agentic programming! This project demonstrates how to use Claude Code to build a full-stack application by providing clear prompts that guide the AI to create a complete system.

## Project: Recipe Manager

We'll build a Recipe Manager application - a full-stack system that allows users to create, view, update, and delete recipes. This project is perfect for learning because it:

- Demonstrates CRUD operations across the stack
- Shows how to work with relational data (recipes, ingredients, categories)
- Involves frontend, backend, and database integration
- Can be built incrementally with clear milestones
- Uses modern, industry-standard technologies

### Technology Stack

- **Frontend**: Next.js (React framework with TypeScript)
- **Backend**: Python FastAPI (modern, fast REST API framework)
- **Database**: PostgreSQL (relational database)
- **Infrastructure**: Docker Compose (for local development)
- **Build Tools**: Makefile (for common tasks)

### Features

1. Create, read, update, and delete recipes
2. Manage recipe ingredients and instructions
3. Categorize recipes (e.g., breakfast, lunch, dinner, dessert)
4. Search and filter recipes
5. Rate recipes (optional enhancement)

## Repository Structure

- **main branch**: Contains this README with instructions, stub Makefile, and stub docker-compose.yml
- **solution-1 branch**: Contains a complete working implementation

## Getting Started

### Prerequisites

Before starting, you'll need to install these tools:

- **Docker Desktop** (includes Docker Compose V2)
- **Node.js 24+** and **npm**
- **Python 3.13+**
- **Claude Code CLI**
- Basic understanding of REST APIs and web development

### Installing Prerequisites

#### Option A: Using mise (Recommended for Node.js and Python)

[mise](https://mise.jdx.dev/) is a modern runtime manager that simplifies installing Node.js and Python.

**Install mise:**
```bash
# macOS/Linux
curl https://mise.run | sh

# Or with Homebrew (macOS)
brew install mise

# Add to your shell (follow mise's instructions)
echo 'eval "$(mise activate bash)"' >> ~/.bashrc  # for bash
echo 'eval "$(mise activate zsh)"' >> ~/.zshrc    # for zsh
```

**Install Node.js and Python with mise:**
```bash
# Install Node.js 24
mise install node@24
mise use -g node@24

# Install Python 3.13
mise install python@3.13
mise use -g python@3.13

# Verify installations
node --version   # Should show v24.x.x
python --version # Should show 3.13.x
```

**Using mise with this project:**
```bash
# Create .mise.toml in project root
cat > .mise.toml << EOF
[tools]
node = "24"
python = "3.13"
EOF

# mise will automatically use these versions when in the project directory
mise install
```

#### Option B: Manual Installation

#### Docker Desktop (includes Docker Compose V2)

**macOS:**
```bash
# Download from Docker website
open https://www.docker.com/products/docker-desktop

# Or install with Homebrew
brew install --cask docker
```

**Windows:**
```bash
# Download from Docker website
start https://www.docker.com/products/docker-desktop

# Or install with winget
winget install Docker.DockerDesktop
```

**Linux:**
```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Verify installation
docker compose version  # Should show Docker Compose version v2.x.x
```

#### Node.js and npm

**macOS:**
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
open https://nodejs.org/
```

**Windows:**
```bash
# Using winget
winget install OpenJS.NodeJS

# Or download from nodejs.org
start https://nodejs.org/
```

**Linux:**
```bash
# Using NodeSource repository (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v24.x.x or higher
npm --version
```

#### Python 3.13+

**macOS:**
```bash
# Using Homebrew
brew install python@3.13

# Verify installation
python3 --version  # Should show 3.13.x or higher
```

**Windows:**
```bash
# Using winget
winget install Python.Python.3.13

# Or download from python.org
start https://www.python.org/downloads/
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3.13 python3.13-venv python3-pip

# Verify installation
python3 --version  # Should show 3.13.x or higher
```

#### Claude Code CLI

```bash
# Install Claude Code CLI
# Visit the official documentation for installation instructions:
# https://docs.claude.com/claude-code

# Verify installation
claude --version
```

### Branch Strategy

1. Start on the `main` branch to follow along and build the project yourself
2. Switch to `solution-1` branch to see a complete working solution
3. Compare your implementation with the solution to learn different approaches

## Building the Project with Claude Code

Follow these prompts in order with Claude Code. Each prompt builds on the previous one.

### Prompt 1: Initialize Next.js Frontend

```
Create a new Next.js project in a 'frontend' directory with the following requirements:
- Use TypeScript
- Use the App Router (not Pages Router)
- Include Tailwind CSS for styling
- Set up ESLint
- Create a basic home page with a heading "Recipe Manager"
- Configure the app to run on port 3000
```

### Prompt 2: Initialize FastAPI Backend

```
Create a Python FastAPI backend in a 'backend' directory with:
- Virtual environment setup instructions
- requirements.txt with FastAPI, uvicorn, SQLAlchemy, psycopg2-binary, python-dotenv, and pydantic
- Basic FastAPI app structure in main.py
- CORS middleware configured to allow requests from http://localhost:3000
- A health check endpoint at GET /health
- Configure the app to run on port 8000
- Add a .env.example file for environment variables
```

### Prompt 3: Set Up PostgreSQL with Docker

```
Create a PostgreSQL database setup:
- Add PostgreSQL service to docker-compose.yml
- Create a .env file with database credentials (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD)
- Set up SQLAlchemy database connection in backend/database.py
- Create initial database models for:
  - Recipe (id, title, description, instructions, prep_time, cook_time, servings, created_at, updated_at)
  - Category (id, name, description)
  - Ingredient (id, recipe_id, name, amount, unit)
- Create Alembic migrations setup for database schema management
```

### Prompt 4: Implement REST API Endpoints

```
Implement the following FastAPI endpoints in the backend:
- POST /api/recipes - Create a new recipe
- GET /api/recipes - List all recipes (with optional category filter)
- GET /api/recipes/{id} - Get a specific recipe with ingredients
- PUT /api/recipes/{id} - Update a recipe
- DELETE /api/recipes/{id} - Delete a recipe
- GET /api/categories - List all categories
- POST /api/categories - Create a new category

Include:
- Pydantic models for request/response validation
- Proper error handling (404, 400, 500)
- Database transactions
- API documentation via FastAPI's automatic Swagger UI
```

### Prompt 5: Create Frontend UI Components

```
Create the frontend UI for the Recipe Manager:
- Recipe list page showing all recipes in a grid/card layout
- Recipe detail page showing full recipe information
- Recipe creation form with fields for title, description, instructions, prep time, cook time, servings, category, and ingredients
- Recipe edit form (can reuse creation form)
- Navigation bar with links to home and create recipe
- Use React hooks for state management
- Implement API calls to the backend using fetch or axios
- Add loading states and error handling
- Style with Tailwind CSS for a clean, modern look
```

### Prompt 6: Create Docker Compose Setup

```
Create a complete docker-compose.yml that includes:
- PostgreSQL service with persistent volume
- FastAPI backend service with hot-reload enabled
- Next.js frontend service with hot-reload enabled
- Proper networking between services
- Environment variable configuration
- Health checks for each service
- Expose appropriate ports (3000 for frontend, 8000 for backend, 5432 for postgres)
```

### Prompt 7: Add Makefile for Common Tasks

```
Create a Makefile with the following targets:
- 'make setup' - Initial setup (create .env from .env.example, install dependencies)
- 'make install' - Install frontend and backend dependencies
- 'make dev' - Start all services with Docker Compose
- 'make stop' - Stop all services
- 'make clean' - Clean up containers, volumes, and cache
- 'make migrate' - Run database migrations
- 'make test-backend' - Run backend tests (pytest)
- 'make test-frontend' - Run frontend tests (Jest)
- 'make lint' - Run linters for both frontend and backend
- 'make logs' - View logs from all services
- 'make shell-backend' - Open a shell in the backend container
- 'make shell-db' - Open a psql shell in the database

Include helpful comments explaining what each target does.
Use 'docker compose' (V2 syntax) not 'docker-compose' (V1 syntax).
```

### Prompt 8: Add Testing

```
Add comprehensive testing:

Backend tests (pytest):
- Unit tests for CRUD operations
- Integration tests for API endpoints
- Database fixture setup and teardown
- Test configuration with a separate test database

Frontend tests (Jest + React Testing Library):
- Component rendering tests
- Form validation tests
- API interaction mocks
- User interaction tests

Include a conftest.py for backend and jest.config.js for frontend.
```

### Prompt 9: Add Documentation

```
Create comprehensive documentation:
- API documentation (expand on FastAPI's automatic docs)
- Database schema diagram (can be ASCII or instructions for generating)
- Setup and installation guide in SETUP.md
- Architecture overview in ARCHITECTURE.md
- Contributing guidelines in CONTRIBUTING.md
- Add inline code comments for complex logic
```

## Running the Project

Once you've completed all the prompts (or checked out the solution branch):

```bash
# Initial setup
make setup
make install

# Run database migrations
make migrate

# Start all services
make dev

# View logs
make logs

# Run tests
make test-backend
make test-frontend
```

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs
- Database: localhost:5432

## Learning Objectives

By completing this tutorial, you'll learn:

1. **Agentic Programming**: How to effectively prompt AI to build complete features
2. **Full-Stack Development**: Integrating frontend, backend, and database
3. **Modern Tools**: Using Docker, Docker Compose, and Makefiles for development
4. **API Design**: Creating RESTful APIs with proper structure
5. **Database Design**: Modeling relational data and using migrations
6. **Testing**: Writing and running tests for both frontend and backend
7. **DevOps Basics**: Containerization and local development workflows

## Tips for Working with Claude Code

1. **Be Specific**: The more detailed your prompts, the better the results
2. **Iterate**: Don't expect perfection on the first try - refine and improve
3. **Ask Questions**: If something isn't clear, ask Claude to explain
4. **Review Code**: Always review generated code to understand what it does
5. **Test Frequently**: Run tests after each major change
6. **Use Version Control**: Commit frequently so you can roll back if needed

## Enhancements (Optional Challenges)

Once you've completed the basic project, try these enhancements:

1. Add user authentication (JWT tokens)
2. Implement recipe ratings and reviews
3. Add image upload for recipe photos
4. Create a recipe search with full-text search
5. Add nutritional information tracking
6. Implement recipe sharing via public links
7. Add a meal planning feature
8. Create a grocery list generator from recipes

## Troubleshooting

Common issues and solutions:

- **Port conflicts**: Change ports in docker-compose.yml if 3000, 8000, or 5432 are in use
- **Database connection**: Ensure PostgreSQL is running and credentials match
- **CORS errors**: Verify CORS middleware is configured in FastAPI
- **Hot reload not working**: Check volume mounts in docker-compose.yml
- **Dependencies**: Run `make install` if you encounter import errors

## Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)

## Contributing

This is a learning project! Feel free to:
- Try different approaches
- Add new features
- Improve documentation
- Share your learnings

## License

MIT License - feel free to use this project for learning and teaching.
