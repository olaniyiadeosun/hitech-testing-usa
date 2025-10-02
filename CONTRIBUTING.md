# Contributing to Hitech Testing USA Website

Thank you for your interest in contributing to the Hitech Testing USA website! This document provides guidelines for contributing to the project.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- Git
- A code editor (VS Code recommended)

### Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/hitech-testing-usa.git`
3. Install dependencies: `npm run setup`
4. Set up environment variables (see README.md)

## 📋 Development Workflow

### Branch Naming
Use descriptive branch names:
- `feature/ai-product-search` - New features
- `fix/navbar-mobile` - Bug fixes
- `docs/api-endpoints` - Documentation
- `refactor/component-structure` - Code refactoring

### Commit Messages
Follow conventional commit format:
```
type(scope): description

feat(ai): add product recommendation scoring
fix(ui): resolve mobile navigation overflow
docs(api): update endpoint documentation
refactor(components): extract reusable button component
```

### Pull Request Process
1. Create a feature branch from `master`
2. Make your changes
3. Test thoroughly
4. Update documentation if needed
5. Submit a pull request with:
   - Clear description
   - Screenshots (for UI changes)
   - Testing instructions

## 🧪 Testing

### Frontend Testing
```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build test
npm run build
```

### Backend Testing
```bash
cd backend

# Test API endpoints
python -m pytest tests/

# Test CSV parsing
python test_csv_parser.py
```

## 🎨 Code Style

### TypeScript/React
- Use TypeScript strict mode
- Prefer functional components with hooks
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Python
- Follow PEP 8 style guide
- Use type hints
- Add docstrings for functions and classes
- Keep functions small and focused

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Use semantic class names
- Keep custom CSS minimal

## 🔧 Development Guidelines

### Component Structure
```tsx
// Good component structure
interface ComponentProps {
  title: string;
  onAction: () => void;
}

export const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // Hooks at the top
  const [state, setState] = useState();
  
  // Event handlers
  const handleClick = () => {
    // Implementation
  };
  
  // Render
  return (
    <div className="component">
      {/* JSX */}
    </div>
  );
};
```

### API Integration
```typescript
// Use the centralized API client
import { productApi } from '@/lib/api';

// Good API usage
const fetchProducts = async () => {
  try {
    const response = await productApi.search(query);
    setProducts(response.recommendations);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    // Handle error appropriately
  }
};
```

### Error Handling
```typescript
// Always handle errors gracefully
try {
  const result = await riskyOperation();
  // Handle success
} catch (error) {
  console.error('Operation failed:', error);
  // Show user-friendly error message
  toast.error('Something went wrong. Please try again.');
}
```

## 📊 Data Management

### Adding New Products
1. Update `backend/data/products.csv`
2. Add product images to `public/images/`
3. Update product categories if needed
4. Test AI recommendations

### CSV Format Requirements
- Use UTF-8 encoding
- Include all required columns
- Validate data types
- Test with AI integration

## 🚀 Performance Guidelines

### Frontend Performance
- Use `React.memo()` for expensive components
- Implement proper loading states
- Optimize images with Next.js
- Use dynamic imports for large components

### Backend Performance
- Implement proper caching
- Use rate limiting
- Optimize database queries
- Monitor API response times

## 🔒 Security Guidelines

### Environment Variables
- Never commit API keys
- Use `.env.example` templates
- Validate all environment variables
- Use different keys for dev/prod

### API Security
- Validate all inputs
- Implement rate limiting
- Use HTTPS in production
- Sanitize user inputs

## 📝 Documentation

### Code Documentation
- Add JSDoc comments for complex functions
- Document API endpoints
- Include usage examples
- Keep README.md updated

### Component Documentation
```tsx
/**
 * AIProductFinder component for intelligent product recommendations
 * 
 * @param onRecommendation - Callback when product is recommended
 * @param initialQuery - Optional initial search query
 * @example
 * <AIProductFinder 
 *   onRecommendation={(product) => console.log(product)}
 *   initialQuery="tensile testing machine"
 * />
 */
```

## 🐛 Bug Reports

When reporting bugs, include:
1. Clear description of the issue
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots if applicable
5. Browser/device information
6. Error messages or console logs

## 💡 Feature Requests

For feature requests:
1. Check existing issues first
2. Provide clear use case
3. Explain expected behavior
4. Consider implementation complexity
5. Include mockups if applicable

## 📞 Getting Help

- Create an issue for questions
- Join our development discussions
- Check existing documentation
- Review similar issues/PRs

## 🎯 Release Process

1. All changes go through code review
2. Automated tests must pass
3. Documentation is updated
4. Version is bumped appropriately
5. Release notes are generated

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to Hitech Testing USA! 🚀
