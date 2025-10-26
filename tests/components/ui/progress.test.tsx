import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { Progress } from '@/components/ui/progress'

describe('Progress', () => {
  describe('Rendering', () => {
    it('should render progress', () => {
      render(<Progress data-testid="progress" />)
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<Progress data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      expect(progress).toHaveClass(
        'relative',
        'h-4',
        'w-full',
        'overflow-hidden',
        'rounded-full',
        'bg-secondary'
      )
    })

    it('should merge custom className', () => {
      render(<Progress className="custom-class" data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      expect(progress).toHaveClass('custom-class', 'relative')
    })

    it('should render indicator element', () => {
      render(<Progress value={50} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      const indicator = progress.querySelector('[class*="bg-primary"]')
      expect(indicator).toBeInTheDocument()
    })
  })

  describe('Value', () => {
    it('should render with value', () => {
      render(<Progress value={50} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      expect(progress).toBeInTheDocument()
    })

    it('should render with 100% value', () => {
      render(<Progress value={100} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      expect(progress).toBeInTheDocument()
    })

    it('should render with 0% value', () => {
      render(<Progress value={0} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      expect(progress).toBeInTheDocument()
    })

    it('should handle fractional values', () => {
      render(<Progress value={33.33} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      expect(progress).toBeInTheDocument()
    })

    it('should handle null value as indeterminate', () => {
      render(<Progress value={null} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      expect(progress).toHaveAttribute('data-state', 'indeterminate')
    })
  })

  describe('Min/Max', () => {
    it('should have default min of 0', () => {
      render(<Progress />)
      const progress = screen.getByRole('progressbar')
      // Radix Progress uses aria-valuemin, defaulting to 0
      expect(progress).toHaveAttribute('aria-valuemin')
    })

    it('should have default max of 100', () => {
      render(<Progress />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuemax', '100')
    })

    it('should support custom max', () => {
      render(<Progress max={200} value={100} />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-valuemax', '200')
    })
  })

  describe('Indicator transform', () => {
    it('should transform indicator based on value', () => {
      render(<Progress value={50} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      const indicator = progress.querySelector('[class*="bg-primary"]')

      // At 50%, transform should be -50%
      expect(indicator).toHaveStyle({ transform: 'translateX(-50%)' })
    })

    it('should be fully visible at 100%', () => {
      render(<Progress value={100} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      const indicator = progress.querySelector('[class*="bg-primary"]')

      // At 100%, transform should be 0%
      expect(indicator).toHaveStyle({ transform: 'translateX(-0%)' })
    })

    it('should be fully hidden at 0%', () => {
      render(<Progress value={0} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      const indicator = progress.querySelector('[class*="bg-primary"]')

      // At 0%, transform should be -100%
      expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' })
    })

    it('should handle null value', () => {
      render(<Progress value={null} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      const indicator = progress.querySelector('[class*="bg-primary"]')

      // null should be treated as 0
      expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' })
    })

    it('should handle undefined value', () => {
      render(<Progress value={undefined} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      const indicator = progress.querySelector('[class*="bg-primary"]')

      // undefined should be treated as 0
      expect(indicator).toHaveStyle({ transform: 'translateX(-100%)' })
    })
  })

  describe('HTML attributes', () => {
    it('should support id attribute', () => {
      render(<Progress id="upload-progress" data-testid="progress" />)
      expect(screen.getByTestId('progress')).toHaveAttribute('id', 'upload-progress')
    })

    it('should support data attributes', () => {
      render(<Progress data-testid="progress" data-upload="file1" />)
      const progress = screen.getByTestId('progress')
      expect(progress).toHaveAttribute('data-upload', 'file1')
    })

    it('should support aria-label', () => {
      render(<Progress aria-label="Upload progress" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-label', 'Upload progress')
    })

    it('should support aria-labelledby', () => {
      render(
        <div>
          <span id="progress-label">Loading</span>
          <Progress aria-labelledby="progress-label" />
        </div>
      )
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-labelledby', 'progress-label')
    })
  })

  describe('States', () => {
    it('should handle indeterminate state', () => {
      render(<Progress value={null} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      expect(progress).toHaveAttribute('data-state', 'indeterminate')
    })

    it('should render with 100% value', () => {
      render(<Progress value={100} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      // Radix Progress with value 100 renders correctly
      expect(progress).toBeInTheDocument()
      const indicator = progress.querySelector('[class*="bg-primary"]')
      // At 100%, indicator should be fully visible (translateX 0%)
      expect(indicator).toHaveStyle({ transform: 'translateX(-0%)' })
    })

    it('should handle progress state with value', () => {
      render(<Progress value={50} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      // Radix Progress uses different states based on value
      expect(progress).toBeInTheDocument()
    })
  })

  describe('Usage patterns', () => {
    it('should work as file upload indicator', () => {
      render(
        <div>
          <span>Uploading: 75%</span>
          <Progress value={75} data-testid="progress" />
        </div>
      )
      expect(screen.getByText('Uploading: 75%')).toBeInTheDocument()
      expect(screen.getByTestId('progress')).toBeInTheDocument()
    })

    it('should work as loading indicator', () => {
      render(
        <div>
          <Progress value={null} aria-label="Loading content" />
        </div>
      )
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-label', 'Loading content')
    })

    it('should work with label', () => {
      render(
        <div>
          <label id="download-label">Download Progress</label>
          <Progress value={60} aria-labelledby="download-label" />
        </div>
      )
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-labelledby', 'download-label')
    })
  })

  describe('Styling', () => {
    it('should have indicator with transition', () => {
      render(<Progress value={50} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      const indicator = progress.querySelector('[class*="transition-all"]')
      expect(indicator).toHaveClass('transition-all')
    })

    it('should have indicator with primary background', () => {
      render(<Progress value={50} data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      const indicator = progress.querySelector('[class*="bg-primary"]')
      expect(indicator).toHaveClass('bg-primary')
    })

    it('should support custom height via className', () => {
      render(<Progress value={50} className="h-2" data-testid="progress" />)
      const progress = screen.getByTestId('progress')
      expect(progress).toHaveClass('h-2')
    })
  })

  describe('Accessibility', () => {
    it('should have progressbar role', () => {
      render(<Progress />)
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
    })

    it('should have proper aria-valuemax', () => {
      render(<Progress max={200} />)
      expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '200')
    })

    it('should support aria-label for accessibility', () => {
      render(<Progress value={75} aria-label="Loading progress" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-label', 'Loading progress')
    })

    it('should be perceivable by screen readers', () => {
      render(<Progress value={50} aria-label="Upload progress" data-testid="progress" />)
      const progress = screen.getByRole('progressbar')
      expect(progress).toHaveAttribute('aria-label', 'Upload progress')
      expect(progress).toBeInTheDocument()
    })
  })

  describe('Ref forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = { current: null }
      render(<Progress ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })
})
