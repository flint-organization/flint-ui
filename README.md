# @flint-org/ui

[![NPM Version](https://img.shields.io/npm/v/@flint-org/ui?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@flint-org/ui)
[![NPM Downloads](https://img.shields.io/npm/dm/@flint-org/ui?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@flint-org/ui)
[![CI](https://github.com/flint-organization/flint-ui/workflows/CI/badge.svg)](https://github.com/flint-organization/flint-ui/actions/workflows/ci.yml)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@flint-org/ui?style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/@flint-org/ui)
[![License](https://img.shields.io/npm/l/@flint-org/ui?style=flat&colorA=000000&colorB=000000)](https://github.com/flint-organization/flint-ui/blob/main/LICENSE)

> **Enterprise-grade React component library with beautiful, pre-animated components**

Built on Radix UI primitives, styled with Tailwind CSS, and animated with Framer Motion. Features 50+ production-ready components with full TypeScript support, dark mode, and accessibility built-in.

---

## ✨ Features

- 🎭 **50+ Components** - Comprehensive library covering all enterprise needs
- 🎬 **Pre-Animated** - Every component includes beautiful Framer Motion animations
- 🎨 **Tailwind-Native** - Deep integration with Tailwind CSS for easy customization
- ♿ **Accessible** - WCAG 2.1 AA compliant, keyboard navigation, screen reader support
- 📦 **Tree-Shakeable** - Individual component imports (Button = ~2KB vs 76KB full bundle)
- 🌙 **Dark Mode** - Built-in theme system with next-themes support
- 📘 **TypeScript** - 100% TypeScript with full type definitions
- 🔧 **Radix Primitives** - Built on battle-tested, accessible primitives
- ⚡ **Performance** - Optimized bundle size, code-splitting ready
- 📚 **Documented** - Comprehensive Storybook with 80+ examples

---

## 📦 Installation

### From NPM (Recommended)

```bash
# npm
npm install @flint-org/ui framer-motion tailwindcss

# pnpm
pnpm add @flint-org/ui framer-motion tailwindcss

# yarn
yarn add @flint-org/ui framer-motion tailwindcss
```

### From GitHub Packages

```bash
npm install @flint-org/ui --registry=https://npm.pkg.github.com
```

### Peer Dependencies

The library requires these peer dependencies:

- `react` >= 18.0.0
- `react-dom` >= 18.0.0
- `framer-motion` (optional, for animated components)
- `tailwindcss` >= 3.0.0 (for styling)

---

## 🚀 Quick Start

### 1. Install the package

```bash
pnpm add @flint-org/ui framer-motion tailwindcss
```

### 2. Import CSS

Add to your root layout or `_app.tsx`:

```typescript
import '@flint-org/ui/styles';
```

### 3. Configure Tailwind (Optional but recommended)

Use our preset for the full experience:

```javascript
// tailwind.config.js
import flintPreset from '@flint-org/ui/preset';

export default {
  presets: [flintPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@flint-org/ui/dist/**/*.js',
  ],
};
```

### 4. Use components

```tsx
import { Button, Card, AnimatedCounter } from '@flint-org/ui';

export default function App() {
  return (
    <Card>
      <h2>Total Revenue</h2>
      <AnimatedCounter value={45231} prefix="$" />
      <Button>View Details</Button>
    </Card>
  );
}
```

---

## 📦 Import Strategies

@flint-org/ui supports multiple import patterns to optimize your bundle size. Choose based on your needs:

### ⚡ Optimized Imports (Recommended for Production)

Import only what you need for the smallest bundle sizes:

```tsx
// UI Primitives (~1-2KB each)
import { Button } from '@flint-org/ui/button';
import { Card } from '@flint-org/ui/card';
import { Input } from '@flint-org/ui/input';

// Custom Components
import { DataTable } from '@flint-org/ui/data-table';  // ~10KB (includes TanStack Table)
import { Navbar } from '@flint-org/ui/navbar';

// Animated Components
import { AnimatedCounter } from '@flint-org/ui/animated/animated-counter';  // ~15KB (includes Framer Motion)
import { TiltCard } from '@flint-org/ui/animated/tilt-card';

// Utilities & Hooks
import { cn } from '@flint-org/ui/utils';
import { useToast } from '@flint-org/ui/hooks';
```

### 🚀 Convenience Import (Quick Start/Prototyping)

Import from the main entry for faster development:

```tsx
// Full bundle (~76KB) - includes all components
import { Button, Card, Input, DataTable, AnimatedCounter } from '@flint-org/ui';
```

### 📊 Bundle Size Comparison

| Import Method | Bundle Size | Use Case |
|---------------|-------------|----------|
| `@flint-org/ui/button` | **~1.9KB** | ✅ Production (97% smaller!) |
| `@flint-org/ui/data-table` | **~10KB** | Complex data tables |
| `@flint-org/ui/animated/counter` | **~15KB** | Animated components |
| `@flint-org/ui` (barrel) | **~76KB** | Quick prototyping |

### 🎯 Best Practices

1. **Production apps**: Use individual imports (`@flint-org/ui/button`)
2. **Prototypes/demos**: Use barrel import (`@flint-org/ui`)
3. **Animated components**: Only import when you need animations
4. **Tree-shaking**: Works automatically with individual imports
5. **Next.js App Router**: Add `"use client"` to your page/component if needed

**Example: Optimized Next.js Page**

```tsx
'use client';

import { Button } from '@flint-org/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@flint-org/ui/card';
import { cn } from '@flint-org/ui/utils';

export default function Dashboard() {
  return (
    <div className={cn('container mx-auto p-6')}>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

Bundle size: **~3-5KB** instead of 76KB! 🎉

---

## 📚 Component Categories

### UI Primitives (21 components)
`Button`, `Card`, `Input`, `Badge`, `Dialog`, `Table`, `Skeleton`, `Select`, `Textarea`, `Checkbox`, `Switch`, `Tabs`, `DropdownMenu`, `Popover`, `Toast`, `Avatar`, `Progress`, `Separator`, `Calendar`, `Label`, `Toaster`

### Animated Components (7 components)
`AnimatedCounter`, `ScrollReveal`, `TiltCard`, `TechBadge`, `CodeSnippet`, `GradientBackground`, `AnimatedComponents`

### Custom Components (10 components)
`ThemeToggle`, `LoadingSpinner`, `Navbar`, `Sidebar`, `EmptyState`, `StatusBadge`, `Pagination`, `SearchInput`, `ActivityItem`, `FilterBar`

### Data Display (2 components)
`DataTable`, `DataTableColumnHeader`

### Coming Soon (Week 2-4)
`Tooltip`, `Alert`, `Sheet`, `Breadcrumb`, `RadioGroup`, `Slider`, `Accordion`, `Command`, `Combobox`, `DatePicker`, `Form`, `Stepper`, `Timeline`, `Menu`, `NumberInput`, `FileUpload`, `MultiSelect`, `Carousel`, `Rating`, `Tree`, `ContextMenu`, `ScrollArea`

---

## 📖 Documentation

- **Storybook:** [View live examples](https://flint-organization.github.io/flint-ui)
- **Documentation:** [Read the docs](https://docs.flint-ui.com) _(Coming Soon)_
- **Demo:** [See components in action](https://flint-three.vercel.app)
- **API Reference:** Check each component's TypeScript definitions

---

## 🎨 Theming

### Dark Mode

The library includes built-in dark mode support via CSS variables:

```tsx
import { ThemeProvider } from 'next-themes';

function App({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

### Customization

Override CSS variables to match your brand:

```css
:root {
  --ui-primary: 262 83% 58%;
  --ui-background: 0 0% 100%;
  --ui-foreground: 222 47% 11%;
  --ui-radius: 0.5rem;
  /* ... more variables */
}

.dark {
  --ui-primary: 263 70% 50%;
  --ui-background: 224 71% 4%;
  --ui-foreground: 213 31% 91%;
  /* ... more variables */
}
```

---

## 💡 Usage Examples

### Basic Button

```tsx
import { Button } from '@flint-org/ui';

<Button variant="default" size="md">
  Click me
</Button>
```

### Data Table

```tsx
import { DataTable } from '@flint-org/ui';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

<DataTable columns={columns} data={users} />
```

### Animated Counter

```tsx
import { AnimatedCounter } from '@flint-org/ui';

<AnimatedCounter
  value={45231}
  prefix="$"
  duration={2}
/>
```

### Scroll Reveal Animation

```tsx
import { ScrollReveal } from '@flint-org/ui';

<ScrollReveal variant="fadeInUp">
  <Card>Content appears on scroll</Card>
</ScrollReveal>
```

---

## 🏗️ Framework Support

### Next.js (App Router)

```tsx
// app/layout.tsx
import '@flint-org/ui/styles';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Next.js (Pages Router)

```tsx
// _app.tsx
import '@flint-org/ui/styles';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### Vite + React

```tsx
// main.tsx
import '@flint-org/ui/styles';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

---

## 🔧 TypeScript

All components are fully typed:

```typescript
import { ButtonProps, CardProps } from '@flint-org/ui';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

---

## 📦 Bundle Size

The library is optimized for production:

- **Full Library:** ~50KB gzipped
- **Tree-shakeable:** Only bundle what you import
- **Example:** Button + Card = ~8KB gzipped

Check your bundle with:
```bash
npx bundlephobia @flint-org/ui
```

---

## 🧪 Testing

The library includes comprehensive tests using Vitest and React Testing Library.

### Running Tests

```bash
# Run tests in watch mode
pnpm test

# Run tests once (CI mode)
pnpm test:run

# Run tests with coverage
pnpm test:coverage

# Open visual test UI
pnpm test:ui
```

### Test Coverage

We maintain high test coverage for all components:

- **Utilities:** 100% coverage
- **Components:** 80%+ coverage
- **Hooks:** 90%+ coverage
- **Overall:** 75%+ coverage

### Writing Tests

Tests are located in the `tests/` folder, mirroring the `src/` structure:

```
tests/
├── components/
│   ├── ui/
│   │   ├── button.test.tsx
│   │   ├── card.test.tsx
│   │   └── input.test.tsx
│   └── animated/
├── hooks/
│   └── use-toast.test.ts
└── lib/
    └── utils.test.ts
```

Example test:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '../test-utils'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('should render with children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })
})
```

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

**Please ensure:**
- All tests pass (`pnpm test:run`)
- Code is linted (`pnpm lint`)
- TypeScript has no errors (`pnpm typecheck`)
- Coverage remains above 75%

---

## 📄 License

MIT © [Flint UI Team](https://github.com/flint-organization)

See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

Built with amazing open-source tools:

- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Beautiful icons
- [shadcn/ui](https://ui.shadcn.com/) - Component inspiration

---

## 🔗 Links

- 📦 [NPM Package](https://www.npmjs.com/package/@flint-org/ui)
- 📚 [Documentation](https://docs.flint-ui.com) _(Coming Soon)_
- 🎨 [Live Demo](https://flint-three.vercel.app)
- 📖 [Storybook](https://flint-organization.github.io/flint-ui)
- 🐙 [GitHub Repository](https://github.com/flint-organization/flint-ui)
- 🐛 [Report Issues](https://github.com/flint-organization/flint-ui/issues)
- ✨ [Request Features](https://github.com/flint-organization/flint-ui/issues/new)

## 📂 Related Repositories

- [flint-ui](https://github.com/flint-organization/flint-ui) - Component library source
- [flint-demo](https://github.com/flint-organization/flint-demo) - Comprehensive demo application
- [flint-docs](https://github.com/flint-organization/flint-docs) - Documentation site

---

**Made with ❤️ for the React community**
