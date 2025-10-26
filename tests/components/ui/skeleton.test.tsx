import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { Skeleton } from '@/components/ui/skeleton'

describe('Skeleton', () => {
  describe('Rendering', () => {
    it('should render skeleton', () => {
      render(<Skeleton data-testid="skeleton" />)
      expect(screen.getByTestId('skeleton')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('animate-pulse', 'rounded-md', 'bg-muted')
    })

    it('should merge custom className', () => {
      render(<Skeleton className="custom-class" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('custom-class', 'animate-pulse')
    })

    it('should render as div element', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton.tagName).toBe('DIV')
    })
  })

  describe('Animation', () => {
    it('should have pulse animation', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('animate-pulse')
    })
  })

  describe('HTML attributes', () => {
    it('should support id attribute', () => {
      render(<Skeleton id="loading-skeleton" data-testid="skeleton" />)
      expect(screen.getByTestId('skeleton')).toHaveAttribute('id', 'loading-skeleton')
    })

    it('should support data attributes', () => {
      render(<Skeleton data-testid="skeleton" data-loading="true" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveAttribute('data-loading', 'true')
    })

    it('should support style attribute', () => {
      render(<Skeleton data-testid="skeleton" style={{ width: '200px', height: '20px' }} />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveStyle({ width: '200px', height: '20px' })
    })

    it('should support aria-label for accessibility', () => {
      render(<Skeleton data-testid="skeleton" aria-label="Loading content" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveAttribute('aria-label', 'Loading content')
    })
  })

  describe('Sizing variations', () => {
    it('should render with custom width', () => {
      render(<Skeleton className="w-[100px]" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('w-[100px]')
    })

    it('should render with custom height', () => {
      render(<Skeleton className="h-4" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('h-4')
    })

    it('should render with full width', () => {
      render(<Skeleton className="w-full" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('w-full')
    })
  })

  describe('Shape variations', () => {
    it('should render as circle', () => {
      render(<Skeleton className="rounded-full" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('rounded-full')
    })

    it('should render as square', () => {
      render(<Skeleton className="rounded-none" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('rounded-none')
    })

    it('should keep default rounded-md', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('rounded-md')
    })
  })

  describe('Usage patterns', () => {
    it('should work as text placeholder', () => {
      render(
        <div>
          <Skeleton className="h-4 w-[250px]" data-testid="text-skeleton" />
          <Skeleton className="h-4 w-[200px]" data-testid="text-skeleton-2" />
        </div>
      )
      expect(screen.getByTestId('text-skeleton')).toBeInTheDocument()
      expect(screen.getByTestId('text-skeleton-2')).toBeInTheDocument()
    })

    it('should work as avatar placeholder', () => {
      render(
        <Skeleton className="h-12 w-12 rounded-full" data-testid="avatar-skeleton" />
      )
      const skeleton = screen.getByTestId('avatar-skeleton')
      expect(skeleton).toHaveClass('h-12', 'w-12', 'rounded-full')
    })

    it('should work as card placeholder', () => {
      render(
        <div className="space-y-2">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" data-testid="card-skeleton" />
          <Skeleton className="h-4 w-[250px]" data-testid="title-skeleton" />
          <Skeleton className="h-4 w-[200px]" data-testid="desc-skeleton" />
        </div>
      )
      expect(screen.getByTestId('card-skeleton')).toBeInTheDocument()
      expect(screen.getByTestId('title-skeleton')).toBeInTheDocument()
      expect(screen.getByTestId('desc-skeleton')).toBeInTheDocument()
    })

    it('should work as multiple items', () => {
      render(
        <div>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" data-testid={`skeleton-${i}`} />
          ))}
        </div>
      )
      expect(screen.getByTestId('skeleton-0')).toBeInTheDocument()
      expect(screen.getByTestId('skeleton-1')).toBeInTheDocument()
      expect(screen.getByTestId('skeleton-2')).toBeInTheDocument()
    })
  })

  describe('Content', () => {
    it('should render with children (though not typical)', () => {
      render(<Skeleton data-testid="skeleton">Loading...</Skeleton>)
      expect(screen.getByTestId('skeleton')).toHaveTextContent('Loading...')
    })

    it('should render empty by default', () => {
      render(<Skeleton data-testid="skeleton" />)
      expect(screen.getByTestId('skeleton')).toBeEmptyDOMElement()
    })
  })
})
