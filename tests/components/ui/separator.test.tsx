import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { Separator } from '@/components/ui/separator'

describe('Separator', () => {
  describe('Rendering', () => {
    it('should render separator', () => {
      render(<Separator data-testid="separator" />)
      expect(screen.getByTestId('separator')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<Separator data-testid="separator" />)
      const separator = screen.getByTestId('separator')
      expect(separator).toHaveClass('shrink-0', 'bg-border')
    })

    it('should merge custom className', () => {
      render(<Separator className="custom-class" data-testid="separator" />)
      const separator = screen.getByTestId('separator')
      expect(separator).toHaveClass('custom-class', 'bg-border')
    })
  })

  describe('Orientation', () => {
    it('should render horizontal separator by default', () => {
      render(<Separator data-testid="separator" />)
      const separator = screen.getByTestId('separator')
      expect(separator).toHaveAttribute('data-orientation', 'horizontal')
      expect(separator).toHaveClass('h-[1px]', 'w-full')
    })

    it('should render horizontal separator explicitly', () => {
      render(<Separator orientation="horizontal" data-testid="separator" />)
      const separator = screen.getByTestId('separator')
      expect(separator).toHaveAttribute('data-orientation', 'horizontal')
      expect(separator).toHaveClass('h-[1px]', 'w-full')
    })

    it('should render vertical separator', () => {
      render(<Separator orientation="vertical" data-testid="separator" />)
      const separator = screen.getByTestId('separator')
      expect(separator).toHaveAttribute('data-orientation', 'vertical')
      expect(separator).toHaveClass('h-full', 'w-[1px]')
    })

    it('should not have horizontal classes when vertical', () => {
      render(<Separator orientation="vertical" data-testid="separator" />)
      const separator = screen.getByTestId('separator')
      expect(separator).not.toHaveClass('h-[1px]')
      expect(separator).not.toHaveClass('w-full')
    })
  })

  describe('Decorative prop', () => {
    it('should be decorative by default', () => {
      render(<Separator data-testid="separator" />)
      const separator = screen.getByTestId('separator')
      expect(separator).toHaveAttribute('role', 'none')
    })

    it('should be decorative when explicitly set', () => {
      render(<Separator decorative data-testid="separator" />)
      const separator = screen.getByTestId('separator')
      expect(separator).toHaveAttribute('role', 'none')
    })

    it('should have separator role when not decorative', () => {
      render(<Separator decorative={false} data-testid="separator" />)
      const separator = screen.getByTestId('separator')
      expect(separator).toHaveAttribute('role', 'separator')
    })

    it('should have aria-orientation when not decorative', () => {
      render(<Separator decorative={false} orientation="vertical" data-testid="separator" />)
      const separator = screen.getByTestId('separator')
      expect(separator).toHaveAttribute('aria-orientation', 'vertical')
    })
  })

  describe('HTML attributes', () => {
    it('should support id attribute', () => {
      render(<Separator id="my-separator" data-testid="separator" />)
      expect(screen.getByTestId('separator')).toHaveAttribute('id', 'my-separator')
    })

    it('should support data attributes', () => {
      render(<Separator data-testid="separator" data-section="footer" />)
      const separator = screen.getByTestId('separator')
      expect(separator).toHaveAttribute('data-section', 'footer')
    })

    it('should support style attribute', () => {
      render(<Separator data-testid="separator" style={{ margin: '20px' }} />)
      const separator = screen.getByTestId('separator')
      expect(separator).toHaveStyle({ margin: '20px' })
    })
  })

  describe('Usage patterns', () => {
    it('should work in a flex container', () => {
      render(
        <div className="flex">
          <span>Item 1</span>
          <Separator orientation="vertical" data-testid="separator" />
          <span>Item 2</span>
        </div>
      )
      expect(screen.getByTestId('separator')).toBeInTheDocument()
      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
    })

    it('should work between sections', () => {
      render(
        <div>
          <section>Section 1</section>
          <Separator data-testid="separator" />
          <section>Section 2</section>
        </div>
      )
      expect(screen.getByTestId('separator')).toBeInTheDocument()
    })
  })

  describe('Ref forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = { current: null }
      render(<Separator ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })
})
