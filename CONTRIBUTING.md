# Contributing to Broler

Thank you for your interest in contributing to Broler! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Go 1.24 or higher
- Node.js 18 or higher
- Git

### Setting up the Development Environment

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/broler.git
   cd broler
   ```

2. **Install backend dependencies**
   ```bash
   go mod download
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend/broler-frontend
   npm install
   ```

4. **Start development servers**
   ```bash
   # Terminal 1: Backend
   go run main.go

   # Terminal 2: Frontend
   cd frontend/broler-frontend
   npm run dev
   ```

## 🔧 Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add appropriate comments
   - Include error handling

3. **Test your changes**
   ```bash
   # Test backend
   go build -o broler-test .
   ./broler-test

   # Test frontend
   cd frontend/broler-frontend
   npm run build
   ```

### Code Style Guidelines

#### Go Backend

- Use `gofmt` to format your code
- Follow Go naming conventions
- Add appropriate error handling
- Include comments for exported functions
- Use meaningful variable names

#### React Frontend

- Use TypeScript for all new files
- Follow React hooks best practices
- Use Tailwind CSS for styling
- Ensure components are accessible
- Add prop types/interfaces

### Commit Guidelines

- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove)
- Keep the first line under 50 characters
- Reference issues when applicable

Example:
```
Add URL validation for input field

- Validate URL format before starting scan
- Show error message for invalid URLs
- Fixes #123
```

## 🧪 Testing

### Backend Testing

```bash
go test ./...
```

### Frontend Testing

```bash
cd frontend/broler-frontend
npm run lint
npm run build
```

## 📝 Pull Request Process

1. **Ensure your code follows the style guidelines**
2. **Update documentation** if you're changing functionality
3. **Test your changes** thoroughly
4. **Create a pull request** with a clear description of your changes
5. **Link any relevant issues**
6. **Be responsive** to feedback during the review process

### Pull Request Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] I have tested my changes locally
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
```

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Environment information**
   - OS and version
   - Go version
   - Node.js version
   - Browser (for frontend issues)

2. **Steps to reproduce**
   - Clear, numbered steps
   - Expected vs actual behavior
   - Screenshots if applicable

3. **Error messages**
   - Console output
   - Error logs
   - Stack traces

### Feature Requests

When requesting features:

1. **Describe the problem** you're trying to solve
2. **Explain your proposed solution**
3. **Consider alternatives** you've thought about
4. **Provide context** about your use case

## 🏗️ Architecture Overview

### Backend Components

- **`main.go`**: Entry point
- **`broler/`**: Core crawling logic
- **`rpc/`**: gRPC server and protocol definitions
- **`parsing/`**: HTML parsing and URL extraction
- **`networking/`**: HTTP client utilities
- **`utils/`**: Shared utilities

### Frontend Components

- **`app/`**: Next.js pages and API routes
- **`components/`**: Reusable React components
- **`utils/`**: Helper functions and data processing
- **`lib/`**: Configuration and utilities

## 📚 Resources

- [Go Documentation](https://golang.org/doc/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [gRPC Documentation](https://grpc.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 💬 Community

- Open an issue for bug reports or feature requests
- Join discussions in existing issues and PRs
- Help other contributors by reviewing PRs

## 📜 License

By contributing to Broler, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Broler! 🙏