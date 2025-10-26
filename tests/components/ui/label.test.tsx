import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { Label } from '@/components/ui/label'

describe('Label', () => {
  describe('Rendering', () => {
    it('should render with children', () => {
      render(<Label>Email Address</Label>)
      expect(screen.getByText('Email Address')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<Label data-testid="label">Label</Label>)
      const label = screen.getByTestId('label')
      expect(label).toHaveClass('text-sm', 'font-medium', 'leading-none')
    })

    it('should merge custom className', () => {
      render(
        <Label className="custom-class" data-testid="label">
          Label
        </Label>
      )
      const label = screen.getByTestId('label')
      expect(label).toHaveClass('custom-class', 'text-sm')
    })

    it('should render as label element', () => {
      render(<Label>Email</Label>)
      const label = screen.getByText('Email')
      expect(label.tagName).toBe('LABEL')
    })
  })

  describe('HTML attributes', () => {
    it('should support htmlFor attribute', () => {
      render(<Label htmlFor="email-input">Email</Label>)
      const label = screen.getByText('Email')
      expect(label).toHaveAttribute('for', 'email-input')
    })

    it('should support id attribute', () => {
      render(<Label id="email-label">Email</Label>)
      const label = screen.getByText('Email')
      expect(label).toHaveAttribute('id', 'email-label')
    })

    it('should support data attributes', () => {
      render(
        <Label data-testid="label" data-required="true">
          Required Field
        </Label>
      )
      const label = screen.getByTestId('label')
      expect(label).toHaveAttribute('data-required', 'true')
    })
  })

  describe('Form Integration', () => {
    it('should work with input elements', () => {
      render(
        <div>
          <Label htmlFor="username">Username</Label>
          <input id="username" type="text" />
        </div>
      )
      const label = screen.getByText('Username')
      const input = screen.getByRole('textbox')
      expect(label).toHaveAttribute('for', 'username')
      expect(input).toHaveAttribute('id', 'username')
    })

    it('should associate with input via htmlFor', () => {
      render(
        <>
          <Label htmlFor="test-input">Test Label</Label>
          <input id="test-input" />
        </>
      )
      const label = screen.getByText('Test Label')
      expect(label).toHaveAttribute('for', 'test-input')
    })
  })

  describe('Content', () => {
    it('should render text content', () => {
      render(<Label>First Name</Label>)
      expect(screen.getByText('First Name')).toBeInTheDocument()
    })

    it('should render with JSX elements', () => {
      render(
        <Label>
          Email <span className="text-red-500">*</span>
        </Label>
      )
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('*')).toBeInTheDocument()
    })

    it('should render with multiple children', () => {
      render(
        <Label>
          <span>Required</span>
          <span>Field</span>
        </Label>
      )
      expect(screen.getByText('Required')).toBeInTheDocument()
      expect(screen.getByText('Field')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have peer-disabled styles', () => {
      render(<Label data-testid="label">Disabled Label</Label>)
      const label = screen.getByTestId('label')
      expect(label).toHaveClass('peer-disabled:cursor-not-allowed', 'peer-disabled:opacity-70')
    })

    it('should work with disabled inputs', () => {
      render(
        <div>
          <input id="disabled-input" disabled className="peer" />
          <Label htmlFor="disabled-input" data-testid="label">
            Disabled Field
          </Label>
        </div>
      )
      expect(screen.getByTestId('label')).toBeInTheDocument()
    })
  })

  describe('Ref forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = { current: null }
      render(<Label ref={ref}>Label</Label>)
      expect(ref.current).toBeInstanceOf(HTMLLabelElement)
    })
  })
})
