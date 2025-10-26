import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  describe('Rendering', () => {
    it('should render with children', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      render(<Button className="custom-class">Button</Button>)
      expect(screen.getByRole('button')).toHaveClass('custom-class')
    })
  })

  describe('Variants', () => {
    it('should render default variant', () => {
      render(<Button variant="default">Default</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-primary')
    })

    it('should render destructive variant', () => {
      render(<Button variant="destructive">Delete</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-destructive')
    })

    it('should render outline variant', () => {
      render(<Button variant="outline">Outline</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('border')
    })

    it('should render secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-secondary')
    })

    it('should render ghost variant', () => {
      render(<Button variant="ghost">Ghost</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('hover:bg-accent')
    })

    it('should render link variant', () => {
      render(<Button variant="link">Link</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('text-primary', 'underline-offset-4')
    })
  })

  describe('Sizes', () => {
    it('should render default size', () => {
      render(<Button size="default">Default Size</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10')
    })

    it('should render small size', () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-9')
    })

    it('should render large size', () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-11')
    })

    it('should render icon size', () => {
      render(<Button size="icon">⚙</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('h-10', 'w-10')
    })
  })

  describe('Interactions', () => {
    it('should handle click events', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick}>Click me</Button>)
      await user.click(screen.getByRole('button'))

      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should not trigger click when disabled', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      )

      const button = screen.getByRole('button')
      expect(button).toBeDisabled()

      await user.click(button)
      expect(handleClick).not.toHaveBeenCalled()
    })

    it('should handle keyboard interactions', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick}>Keyboard</Button>)
      const button = screen.getByRole('button')

      button.focus()
      await user.keyboard('{Enter}')

      expect(handleClick).toHaveBeenCalled()
    })
  })

  describe('States', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled Button</Button>)
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('should have disabled opacity class when disabled', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toHaveClass('disabled:opacity-50')
    })

    it('should prevent pointer events when disabled', () => {
      render(<Button disabled>Disabled</Button>)
      expect(screen.getByRole('button')).toHaveClass('disabled:pointer-events-none')
    })
  })

  describe('asChild prop', () => {
    it('should render as child component when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      )

      const link = screen.getByRole('link')
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test')
    })

    it('should apply button styles to child component', () => {
      render(
        <Button asChild variant="destructive">
          <a href="/delete">Delete Link</a>
        </Button>
      )

      const link = screen.getByRole('link')
      expect(link).toHaveClass('bg-destructive')
    })
  })

  describe('HTML attributes', () => {
    it('should support type attribute', () => {
      render(<Button type="submit">Submit</Button>)
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
    })

    it('should support aria-label', () => {
      render(<Button aria-label="Close dialog">×</Button>)
      expect(screen.getByRole('button')).toHaveAccessibleName('Close dialog')
    })

    it('should support data attributes', () => {
      render(<Button data-testid="custom-button">Button</Button>)
      expect(screen.getByTestId('custom-button')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have button role', () => {
      render(<Button>Accessible</Button>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('should be keyboard accessible', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()

      render(<Button onClick={handleClick}>Tab to me</Button>)

      await user.tab()
      expect(screen.getByRole('button')).toHaveFocus()
    })

    it('should have focus-visible outline', () => {
      render(<Button>Focus me</Button>)
      expect(screen.getByRole('button')).toHaveClass('focus-visible:outline-none')
    })
  })
})
