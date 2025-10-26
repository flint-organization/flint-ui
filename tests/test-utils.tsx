import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

/**
 * Custom render function that wraps components with necessary providers
 *
 * Usage:
 * ```tsx
 * import { render, screen } from '../test-utils'
 *
 * render(<Button>Click me</Button>)
 * ```
 */

// Add providers here if needed (ThemeProvider, QueryClientProvider, etc.)
function AllProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllProviders, ...options })

// Re-export everything from React Testing Library
export * from '@testing-library/react'

// Override render method
export { customRender as render }
