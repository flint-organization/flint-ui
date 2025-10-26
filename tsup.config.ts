import { defineConfig } from 'tsup';
import { glob } from 'glob';
import path from 'path';

// Generate entry points for all components
function generateEntryPoints() {
  const entries: Record<string, string> = {
    // Main barrel export for convenience
    index: 'src/index.ts',

    // Utilities and hooks
    utils: 'src/lib/utils.ts',
    hooks: 'src/hooks/index.ts',

    // Tailwind preset
    'tailwind-preset': 'src/tailwind-preset.ts',
  };

  // UI Components (32 components in src/components/ui/)
  const uiComponents = glob.sync('src/components/ui/*.tsx', {
    ignore: ['**/*.stories.tsx', '**/*.test.tsx'],
  });

  uiComponents.forEach((file) => {
    const name = path.basename(file, '.tsx');
    entries[`components/${name}`] = file;
  });

  // Custom Components (11 components in src/components/)
  const customComponents = glob.sync('src/components/*.tsx', {
    ignore: ['**/*.stories.tsx', '**/*.test.tsx'],
  });

  customComponents.forEach((file) => {
    const name = path.basename(file, '.tsx');
    entries[`components/${name}`] = file;
  });

  // Animated Components (7 components in src/components/animated/)
  const animatedComponents = glob.sync('src/components/animated/*.tsx', {
    ignore: ['**/*.stories.tsx', '**/*.test.tsx'],
  });

  animatedComponents.forEach((file) => {
    const name = path.basename(file, '.tsx');
    entries[`animated/${name}`] = file;
  });

  return entries;
}

export default defineConfig({
  entry: generateEntryPoints(),
  format: ['cjs', 'esm'],
  dts: {
    resolve: true,
    tsconfig: './tsconfig.src.json',
    compilerOptions: {
      jsx: 'react-jsx',
      moduleResolution: 'bundler',
      skipLibCheck: true,
      types: [], // Prevent auto-loading of @types packages
      baseUrl: './src',
      paths: {
        '@/*': ['./*'],
      },
    },
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'framer-motion',
    'tailwindcss',
    '@radix-ui/*',
    'lucide-react',
    '@tanstack/react-table',
    'cmdk',
    'date-fns',
    'react-day-picker',
  ],
  esbuildOptions(options) {
    options.alias = {
      '@': path.resolve(__dirname, './src'),
    };
  },
  minify: true,
  treeshake: true,
  target: 'es2020',
  outDir: 'dist',
});
