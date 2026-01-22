# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this repository.

## Project Overview

This is a modern portfolio website built with React, TypeScript, Vite, and Tailwind CSS. The project uses shadcn/ui components and follows a component-based architecture with strict TypeScript configuration.

## Build & Development Commands

```bash
# Development
npm run dev              # Start development server on port 3000

# Build & Type Checking  
npm run build            # TypeScript compile + Vite build
npm run preview          # Preview production build

# Code Quality
npm run lint             # ESLint with max 0 warnings, reports unused disables
```

**Note**: There are no test commands configured in this project.

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode enabled**: All TypeScript strict checks are enforced
- **No unused locals/parameters**: Code must not have unused variables
- **No fallthrough cases**: Switch statements must handle all cases
- **JSX**: React JSX transform is used
- **Path aliases**: Use `@/*` for imports from `./src/*`

### Import Organization
```typescript
// 1. React imports first
import React, { useState, useEffect } from "react";

// 2. Third-party libraries (alphabetical)
import { Button } from "./components/ui/button";
import yaml from "js-yaml";

// 3. Local imports (relative paths)
import { cn } from "./utils";
```

### Component Structure
```typescript
// 1. Imports (React, third-party, local)
// 2. Type definitions/interfaces
interface ProjectConfig {
  id: string;
  title: { en: string; ru: string };
  // ...
}

// 3. Component function
export default function ComponentName() {
  // 4. Hooks (useState, useEffect, etc.)
  const [state, setState] = useState<Type>();
  
  // 5. Event handlers
  const handleClick = () => {
    // ...
  };
  
  // 6. Effects
  useEffect(() => {
    // ...
  }, []);
  
  // 7. Render JSX
  return (
    <div className="...">
      {/* JSX content */}
    </div>
  );
}
```

### Styling Conventions

#### Tailwind CSS Usage
- **Utility-first**: Use Tailwind utilities for all styling
- **Component variants**: Use `class-variance-authority` (cva) for component variants
- **Dark mode**: Use `dark:` prefix for dark mode styles
- **Responsive**: Mobile-first approach with responsive prefixes

#### CSS Variables
The project uses CSS custom properties defined in `styles/globals.css`:
- Use semantic color tokens: `bg-background`, `text-foreground`, `border-border`
- Custom properties: `--primary`, `--secondary`, `--muted`, etc.
- Typography: `--text-base`, `--text-lg`, `--font-weight-medium`

#### Component Styling Pattern
```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        default: "size-default",
        sm: "size-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
```

### Naming Conventions
- **Components**: PascalCase (e.g., `UserProfile`, `NavigationMenu`)
- **Functions**: camelCase (e.g., `handleClick`, `fetchData`)
- **Variables**: camelCase (e.g., `isLoading`, `userProfile`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Interfaces/Types**: PascalCase (e.g., `UserConfig`, `ApiResponse`)

### Error Handling
- **Async operations**: Use try-catch blocks with proper error logging
- **User feedback**: Use toast notifications (sonner) for user-facing errors
- **Fallbacks**: Provide fallback UI for failed data loads
- **Console errors**: Log errors to console for debugging

### File Organization
```
src/
├── main.tsx              # App entry point
├── components/
│   ├── ui/              # shadcn/ui components
│   └── [feature]/       # Feature-specific components
├── styles/
│   └── globals.css      # Global styles and CSS variables
└── [other]/
```

### shadcn/ui Integration
- **Components**: Use pre-built components from `components/ui/`
- **Utils**: Import `cn` utility from `./utils` for class merging
- **Patterns**: Follow shadcn/ui patterns for component composition
- **Theming**: Use CSS variables for consistent theming

### Performance Guidelines
- **React.memo**: Use for components that re-render unnecessarily
- **useCallback/useMemo**: Optimize expensive computations and callbacks
- **Lazy loading**: Consider lazy loading for large components
- **Bundle size**: Monitor import sizes, especially from large libraries

### Git & Commit Standards
- **Conventional commits**: Use clear, descriptive commit messages
- **Pre-commit hooks**: ESLint runs automatically with `--max-warnings 0`
- **Branch naming**: Use descriptive branch names for features

## Development Workflow

1. **Setup**: Run `npm install` to install dependencies
2. **Development**: Use `npm run dev` for hot-reloading development
3. **Type checking**: TypeScript compilation happens during build
4. **Linting**: ESLint enforces code quality with zero warnings tolerance
5. **Building**: Use `npm run build` for production optimization

## Testing Notes

This project does not currently have a test suite configured. When adding tests:
- Choose an appropriate testing framework (Jest, Vitest, etc.)
- Add test scripts to package.json
- Follow the project's component patterns in test structure

## Key Dependencies

- **React 18**: Modern React with hooks and concurrent features
- **TypeScript**: Strict typing with comprehensive linting
- **Vite**: Fast build tool with HMR
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality component library
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **js-yaml**: YAML parsing for project configuration