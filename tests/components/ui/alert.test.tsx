import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

describe('Alert', () => {
  describe('Rendering', () => {
    it('should render with children', () => {
      render(<Alert>Alert message</Alert>)
      expect(screen.getByText('Alert message')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<Alert data-testid="alert">Alert</Alert>)
      const alert = screen.getByTestId('alert')
      expect(alert).toHaveClass('relative', 'w-full', 'rounded-lg', 'border', 'px-4', 'py-3', 'text-sm')
    })

    it('should have role="alert"', () => {
      render(<Alert>Alert message</Alert>)
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('should merge custom className', () => {
      render(
        <Alert className="custom-class" data-testid="alert">
          Alert
        </Alert>
      )
      expect(screen.getByTestId('alert')).toHaveClass('custom-class', 'relative')
    })
  })

  describe('Variants', () => {
    it('should render default variant', () => {
      render(
        <Alert variant="default" data-testid="alert">
          Default Alert
        </Alert>
      )
      const alert = screen.getByTestId('alert')
      expect(alert).toHaveClass('bg-background', 'text-foreground')
    })

    it('should render destructive variant', () => {
      render(
        <Alert variant="destructive" data-testid="alert">
          Error Alert
        </Alert>
      )
      const alert = screen.getByTestId('alert')
      expect(alert).toHaveClass('text-destructive')
    })

    it('should render success variant', () => {
      render(
        <Alert variant="success" data-testid="alert">
          Success Alert
        </Alert>
      )
      const alert = screen.getByTestId('alert')
      expect(alert).toHaveClass('text-green-700')
    })

    it('should render warning variant', () => {
      render(
        <Alert variant="warning" data-testid="alert">
          Warning Alert
        </Alert>
      )
      const alert = screen.getByTestId('alert')
      expect(alert).toHaveClass('text-yellow-800')
    })
  })

  describe('AlertTitle', () => {
    it('should render title text', () => {
      render(<AlertTitle>Alert Title</AlertTitle>)
      expect(screen.getByText('Alert Title')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<AlertTitle data-testid="title">Title</AlertTitle>)
      const title = screen.getByTestId('title')
      expect(title).toHaveClass('mb-1', 'font-medium', 'leading-none', 'tracking-tight')
    })

    it('should render as h5 element', () => {
      render(<AlertTitle>Title</AlertTitle>)
      const title = screen.getByText('Title')
      expect(title.tagName).toBe('H5')
    })

    it('should merge custom className', () => {
      render(
        <AlertTitle className="custom-title" data-testid="title">
          Title
        </AlertTitle>
      )
      expect(screen.getByTestId('title')).toHaveClass('custom-title', 'mb-1')
    })
  })

  describe('AlertDescription', () => {
    it('should render description text', () => {
      render(<AlertDescription>Alert description</AlertDescription>)
      expect(screen.getByText('Alert description')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<AlertDescription data-testid="description">Description</AlertDescription>)
      const description = screen.getByTestId('description')
      expect(description).toHaveClass('text-sm')
    })

    it('should render as div element', () => {
      render(<AlertDescription>Description</AlertDescription>)
      const description = screen.getByText('Description')
      expect(description.tagName).toBe('DIV')
    })

    it('should merge custom className', () => {
      render(
        <AlertDescription className="custom-desc" data-testid="description">
          Description
        </AlertDescription>
      )
      expect(screen.getByTestId('description')).toHaveClass('custom-desc', 'text-sm')
    })
  })

  describe('Composition', () => {
    it('should render complete alert with title and description', () => {
      render(
        <Alert>
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>You can add components to your app.</AlertDescription>
        </Alert>
      )
      expect(screen.getByText('Heads up!')).toBeInTheDocument()
      expect(screen.getByText('You can add components to your app.')).toBeInTheDocument()
    })

    it('should render alert with icon and content', () => {
      render(
        <Alert>
          <svg data-testid="icon">
            <path />
          </svg>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong</AlertDescription>
        </Alert>
      )
      expect(screen.getByTestId('icon')).toBeInTheDocument()
      expect(screen.getByText('Error')).toBeInTheDocument()
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })

    it('should support all variant compositions', () => {
      const { rerender } = render(
        <Alert variant="default" data-testid="alert">
          <AlertTitle>Default</AlertTitle>
          <AlertDescription>Default message</AlertDescription>
        </Alert>
      )
      expect(screen.getByTestId('alert')).toHaveClass('bg-background')

      rerender(
        <Alert variant="destructive" data-testid="alert">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Error message</AlertDescription>
        </Alert>
      )
      expect(screen.getByTestId('alert')).toHaveClass('text-destructive')

      rerender(
        <Alert variant="success" data-testid="alert">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Success message</AlertDescription>
        </Alert>
      )
      expect(screen.getByTestId('alert')).toHaveClass('text-green-700')

      rerender(
        <Alert variant="warning" data-testid="alert">
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>Warning message</AlertDescription>
        </Alert>
      )
      expect(screen.getByTestId('alert')).toHaveClass('text-yellow-800')
    })
  })

  describe('HTML attributes', () => {
    it('should support id attribute', () => {
      render(
        <Alert id="test-alert" data-testid="alert">
          Alert
        </Alert>
      )
      expect(screen.getByTestId('alert')).toHaveAttribute('id', 'test-alert')
    })

    it('should support data attributes', () => {
      render(
        <Alert data-testid="alert" data-status="error">
          Alert
        </Alert>
      )
      expect(screen.getByTestId('alert')).toHaveAttribute('data-status', 'error')
    })

    it('should support aria attributes', () => {
      render(
        <Alert aria-label="Error notification" data-testid="alert">
          Alert
        </Alert>
      )
      expect(screen.getByTestId('alert')).toHaveAttribute('aria-label', 'Error notification')
    })
  })

  describe('Accessibility', () => {
    it('should have alert role', () => {
      render(<Alert>Important message</Alert>)
      const alert = screen.getByRole('alert')
      expect(alert).toBeInTheDocument()
      expect(alert).toHaveTextContent('Important message')
    })

    it('should be perceivable by screen readers', () => {
      render(
        <Alert>
          <AlertTitle>Error occurred</AlertTitle>
          <AlertDescription>Please check your input</AlertDescription>
        </Alert>
      )
      const alert = screen.getByRole('alert')
      expect(alert).toHaveTextContent('Error occurred')
      expect(alert).toHaveTextContent('Please check your input')
    })
  })
})
