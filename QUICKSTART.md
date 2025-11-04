# Quick Start Guide

Get started with the Recipe Manager tutorial in just a few minutes!

## Option 1: Follow Along (Recommended for Learning)

Start on the `main` branch and use Claude Code to build the project step by step.

### Step 1: Clone and Setup
```bash
# If you haven't cloned yet
git clone <repository-url>
cd ai-dev-session-1

# Create your environment file
make setup
```

### Step 2: Start with Claude Code

Open Claude Code and use the prompts from the README in order:

```bash
# Start Claude Code
claude

# Then use Prompt 1 from README.md to create the Next.js frontend
# Then use Prompt 2 to create the FastAPI backend
# Continue through all 9 prompts...
```

### Step 3: Test Your Work

After each prompt, test what you've built:

```bash
# After frontend/backend setup
make install
make dev

# After adding tests
make test
```

## Option 2: See the Solution

Want to see a working example first?

```bash
# Switch to the solution branch
git checkout solution-1

# Setup and run
make setup
make install
make dev

# Access the application
# Frontend:  http://localhost:3000
# Backend:   http://localhost:8000/docs
```

## Common Commands

```bash
# Initial setup (only needed once)
make setup

# Install dependencies
make install

# Start all services
make dev

# View logs
make logs

# Stop services
make stop

# Run tests
make test

# Clean up everything
make clean
```

## Verify Your Installation

After running `make dev`, check these URLs:

- Frontend: http://localhost:3000 - Should show "Recipe Manager"
- Backend Health: http://localhost:8000/health - Should return `{"status": "healthy"}`
- API Docs: http://localhost:8000/docs - Should show Swagger UI

## Troubleshooting

### Port Already in Use

If you see "port already in use" errors:

```bash
# Check what's using the ports
lsof -i :3000
lsof -i :8000
lsof -i :5432

# Stop conflicting services or change ports in docker-compose.yml
```

### Docker Issues

```bash
# Reset Docker
make clean
docker system prune -a

# Restart Docker Desktop (if using Mac/Windows)
```

### Database Connection Failed

```bash
# Check if database is running
docker-compose ps

# View database logs
docker-compose logs db

# Restart just the database
docker-compose restart db
```

## Learning Path

### If You're New to:

**Agentic Programming**: Start with Prompt 1, carefully read the responses, and iterate

**Full-Stack Development**: Complete all prompts in order, they build on each other

**Docker**: Read the docker-compose.yml comments, try `docker-compose ps` and `docker-compose logs`

**FastAPI**: Check the auto-generated docs at http://localhost:8000/docs

**Next.js**: Explore the frontend code, modify the home page, see changes live

## Next Steps

1. Complete all 9 prompts in the README
2. Run and test the application
3. Compare with solution-1 branch
4. Try the optional enhancements
5. Build your own project!

## Get Help

- Check the full README.md for detailed information
- Review Makefile for all available commands
- Examine docker-compose.yml for service configuration
- Read the prompts carefully - they're designed to be complete
- If stuck, check solution-1 branch for reference

## Tips

1. Commit after each prompt completion
2. Test frequently with `make dev` and `make test`
3. Read the generated code to understand what Claude Code created
4. Don't hesitate to ask Claude Code to explain or modify code
5. Use `make logs` to debug issues

Happy coding!
