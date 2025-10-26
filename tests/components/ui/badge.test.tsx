import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { Badge } from '@/components/ui/badge'

describe('Badge', () => {
  describe('Rendering', () => {
    it('should render with children', () => {
      render(<Badge>New</Badge>)
      expect(screen.getByText('New')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<Badge data-testid="badge">Badge</Badge>)
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'border')
    })

    it('should merge custom className', () => {
      render(
        <Badge className="custom-class" data-testid="badge">
          Badge
        </Badge>
      )
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('custom-class', 'inline-flex')
    })
  })

  describe('Variants', () => {
    it('should render default variant', () => {
      render(
        <Badge variant="default" data-testid="badge">
          Default
        </Badge>
      )
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('bg-primary', 'text-primary-foreground')
    })

    it('should render secondary variant', () => {
      render(
        <Badge variant="secondary" data-testid="badge">
          Secondary
        </Badge>
      )
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground')
    })

    it('should render destructive variant', () => {
      render(
        <Badge variant="destructive" data-testid="badge">
          Error
        </Badge>
      )
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground')
    })

    it('should render outline variant', () => {
      render(
        <Badge variant="outline" data-testid="badge">
          Outline
        </Badge>
      )
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveClass('text-foreground')
    })
  })

  describe('HTML attributes', () => {
    it('should support id attribute', () => {
      render(
        <Badge id="test-badge" data-testid="badge">
          Badge
        </Badge>
      )
      expect(screen.getByTestId('badge')).toHaveAttribute('id', 'test-badge')
    })

    it('should support data attributes', () => {
      render(
        <Badge data-testid="badge" data-status="active">
          Badge
        </Badge>
      )
      const badge = screen.getByTestId('badge')
      expect(badge).toHaveAttribute('data-status', 'active')
    })

    it('should support onClick handler', () => {
      const handleClick = vi.fn()
      render(
        <Badge onClick={handleClick} data-testid="badge">
          Clickable
        </Badge>
      )
      screen.getByTestId('badge').click()
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Content', () => {
    it('should render text content', () => {
      render(<Badge>Badge Text</Badge>)
      expect(screen.getByText('Badge Text')).toBeInTheDocument()
    })

    it('should render with numbers', () => {
      render(<Badge>42</Badge>)
      expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('should render with JSX elements', () => {
      render(
        <Badge>
          <span>Icon</span> Label
        </Badge>
      )
      expect(screen.getByText('Icon')).toBeInTheDocument()
      expect(screen.getByText('Label')).toBeInTheDocument()
    })

    it('should render empty badge', () => {
      render(<Badge data-testid="empty-badge" />)
      expect(screen.getByTestId('empty-badge')).toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('should have focus styles', () => {
      render(<Badge data-testid="badge">Focus me</Badge>)
      expect(screen.getByTestId('badge')).toHaveClass(
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-ring'
      )
    })

    it('should have transition classes', () => {
      render(<Badge data-testid="badge">Badge</Badge>)
      expect(screen.getByTestId('badge')).toHaveClass('transition-colors')
    })

    it('should have text size class', () => {
      render(<Badge data-testid="badge">Badge</Badge>)
      expect(screen.getByTestId('badge')).toHaveClass('text-xs', 'font-semibold')
    })
  })
})
