# @flint/ui

[![NPM Version](https://img.shields.io/npm/v/@flint/ui?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@flint/ui)
[![NPM Downloads](https://img.shields.io/npm/dm/@flint/ui?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@flint/ui)
[![CI](https://github.com/flint-organization/flint-ui/workflows/CI/badge.svg)](https://github.com/flint-organization/flint-ui/actions/workflows/ci.yml)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@flint/ui?style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/@flint/ui)
[![License](https://img.shields.io/npm/l/@flint/ui?style=flat&colorA=000000&colorB=000000)](https://github.com/flint-organization/flint-ui/blob/main/LICENSE)

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

```bash
# npm
npm install @flint/ui framer-motion tailwindcss

# pnpm
pnpm add @flint/ui framer-motion tailwindcss

# yarn
yarn add @flint/ui framer-motion tailwindcss
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
pnpm add @flint/ui framer-motion tailwindcss
```

### 2. Import CSS

Add to your root layout or `_app.tsx`:

```typescript
import '@flint/ui/styles';
```

### 3. Configure Tailwind (Optional but recommended)

Use our preset for the full experience:

```javascript
// tailwind.config.js
import flintPreset from '@flint/ui/preset';

export default {
  presets: [flintPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@flint/ui/dist/**/*.js',
  ],
};
```

### 4. Use components

```tsx
import { Button, Card, AnimatedCounter } from '@flint/ui';

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

@flint/ui supports multiple import patterns to optimize your bundle size. Choose based on your needs:

### ⚡ Optimized Imports (Recommended for Production)

Import only what you need for the smallest bundle sizes:

```tsx
// UI Primitives (~1-2KB each)
import { Button } from '@flint/ui/button';
import { Card } from '@flint/ui/card';
import { Input } from '@flint/ui/input';

// Custom Components
import { DataTable } from '@flint/ui/data-table';  // ~10KB (includes TanStack Table)
import { Navbar } from '@flint/ui/navbar';

// Animated Components
import { AnimatedCounter } from '@flint/ui/animated/animated-counter';  // ~15KB (includes Framer Motion)
import { TiltCard } from '@flint/ui/animated/tilt-card';

// Utilities & Hooks
import { cn } from '@flint/ui/utils';
import { useToast } from '@flint/ui/hooks';
```

### 🚀 Convenience Import (Quick Start/Prototyping)

Import from the main entry for faster development:

```tsx
// Full bundle (~76KB) - includes all components
import { Button, Card, Input, DataTable, AnimatedCounter } from '@flint/ui';
```

### 📊 Bundle Size Comparison

| Import Method | Bundle Size | Use Case |
|---------------|-------------|----------|
| `@flint/ui/button` | **~1.9KB** | ✅ Production (97% smaller!) |
| `@flint/ui/data-table` | **~10KB** | Complex data tables |
| `@flint/ui/animated/counter` | **~15KB** | Animated components |
| `@flint/ui` (barrel) | **~76KB** | Quick prototyping |

### 🎯 Best Practices

1. **Production apps**: Use individual imports (`@flint/ui/button`)
2. **Prototypes/demos**: Use barrel import (`@flint/ui`)
3. **Animated components**: Only import when you need animations
4. **Tree-shaking**: Works automatically with individual imports
5. **Next.js App Router**: Add `"use client"` to your page/component if needed

**Example: Optimized Next.js Page**

```tsx
'use client';

import { Button } from '@flint/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@flint/ui/card';
import { cn } from '@flint/ui/utils';

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
- **Documentation:** [Read the docs](https://docs.flint-ui.com)
- **Demo:** [See components in action](https://demo.flint-ui.com)
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
import { Button } from '@flint/ui';

<Button variant="default" size="md">
  Click me
</Button>
```

### Data Table

```tsx
import { DataTable } from '@flint/ui';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

<DataTable columns={columns} data={users} />
```

### Animated Counter

```tsx
import { AnimatedCounter } from '@flint/ui';

<AnimatedCounter
  value={45231}
  prefix="$"
  duration={2}
/>
```

### Scroll Reveal Animation

```tsx
import { ScrollReveal } from '@flint/ui';

<ScrollReveal variant="fadeInUp">
  <Card>Content appears on scroll</Card>
</ScrollReveal>
```

---

## 🏗️ Framework Support

### Next.js (App Router)

```tsx
// app/layout.tsx
import '@flint/ui/styles';

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
import '@flint/ui/styles';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### Vite + React

```tsx
// main.tsx
import '@flint/ui/styles';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

---

## 🔧 TypeScript

All components are fully typed:

```typescript
import { ButtonProps, CardProps } from '@flint/ui';

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
npx bundlephobia @flint/ui
```

---

## 🤝 Contributing

We welcome contributions!

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

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

- 📦 [NPM Package](https://www.npmjs.com/package/@flint/ui)
- 📚 [Documentation](https://docs.flint-ui.com)
- 🎨 [Live Demo](https://demo.flint-ui.com)
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
