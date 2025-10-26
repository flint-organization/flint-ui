import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '@/components/ui/checkbox'

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('should render checkbox', () => {
      render(<Checkbox data-testid="checkbox" />)
      expect(screen.getByTestId('checkbox')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<Checkbox data-testid="checkbox" />)
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toHaveClass('peer', 'h-4', 'w-4', 'shrink-0', 'rounded-sm', 'border')
    })

    it('should merge custom className', () => {
      render(<Checkbox className="custom-class" data-testid="checkbox" />)
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toHaveClass('custom-class', 'peer')
    })

    it('should render as button element', () => {
      render(<Checkbox data-testid="checkbox" />)
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox.tagName).toBe('BUTTON')
    })
  })

  describe('States', () => {
    it('should render unchecked by default', () => {
      render(<Checkbox data-testid="checkbox" />)
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toHaveAttribute('data-state', 'unchecked')
    })

    it('should render checked when checked prop is true', () => {
      render(<Checkbox checked={true} data-testid="checkbox" />)
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toHaveAttribute('data-state', 'checked')
    })

    it('should render checked when defaultChecked is true', () => {
      render(<Checkbox defaultChecked={true} data-testid="checkbox" />)
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toHaveAttribute('data-state', 'checked')
    })

    it('should toggle state on click', async () => {
      const user = userEvent.setup()
      render(<Checkbox data-testid="checkbox" />)
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toHaveAttribute('data-state', 'unchecked')

      await user.click(checkbox)
      expect(checkbox).toHaveAttribute('data-state', 'checked')

      await user.click(checkbox)
      expect(checkbox).toHaveAttribute('data-state', 'unchecked')
    })
  })

  describe('Disabled state', () => {
    it('should render disabled when disabled prop is true', () => {
      render(<Checkbox disabled data-testid="checkbox" />)
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toBeDisabled()
    })

    it('should have disabled classes', () => {
      render(<Checkbox disabled data-testid="checkbox" />)
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
    })

    it('should not toggle when disabled', () => {
      render(<Checkbox disabled data-testid="checkbox" />)
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toHaveAttribute('data-state', 'unchecked')

      checkbox.click()
      expect(checkbox).toHaveAttribute('data-state', 'unchecked')
    })
  })

  describe('HTML attributes', () => {
    it('should support id attribute', () => {
      render(<Checkbox id="terms" data-testid="checkbox" />)
      expect(screen.getByTestId('checkbox')).toHaveAttribute('id', 'terms')
    })

    it('should accept name attribute in props', () => {
      // Radix Checkbox passes name through but doesn't directly expose it in HTML
      render(<Checkbox name="terms" data-testid="checkbox" />)
      expect(screen.getByTestId('checkbox')).toBeInTheDocument()
    })

    it('should support value attribute', () => {
      render(<Checkbox value="accepted" data-testid="checkbox" />)
      expect(screen.getByTestId('checkbox')).toHaveAttribute('value', 'accepted')
    })

    it('should support data attributes', () => {
      render(<Checkbox data-testid="checkbox" data-required="true" />)
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toHaveAttribute('data-required', 'true')
    })

    it('should support aria-label', () => {
      render(<Checkbox aria-label="Accept terms" data-testid="checkbox" />)
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toHaveAttribute('aria-label', 'Accept terms')
    })
  })

  describe('Callbacks', () => {
    it('should call onCheckedChange when clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox onCheckedChange={handleChange} data-testid="checkbox" />)

      await user.click(screen.getByTestId('checkbox'))
      expect(handleChange).toHaveBeenCalledWith(true)

      await user.click(screen.getByTestId('checkbox'))
      expect(handleChange).toHaveBeenCalledWith(false)
    })

    it('should not call onCheckedChange when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Checkbox disabled onCheckedChange={handleChange} data-testid="checkbox" />)

      await user.click(screen.getByTestId('checkbox'))
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Form integration', () => {
    it('should work with labels', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <label htmlFor="terms-checkbox">Accept terms</label>
          <Checkbox id="terms-checkbox" data-testid="checkbox" />
        </div>
      )
      const label = screen.getByText('Accept terms')
      const checkbox = screen.getByTestId('checkbox')

      await user.click(label)
      expect(checkbox).toHaveAttribute('data-state', 'checked')
    })

    it('should work in forms', () => {
      render(
        <form data-testid="form">
          <Checkbox name="terms" value="accepted" data-testid="checkbox" />
        </form>
      )
      expect(screen.getByTestId('form')).toContainElement(screen.getByTestId('checkbox'))
    })
  })

  describe('Styling', () => {
    it('should have focus-visible styles', () => {
      render(<Checkbox data-testid="checkbox" />)
      expect(screen.getByTestId('checkbox')).toHaveClass(
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-ring',
        'focus-visible:ring-offset-2'
      )
    })

    it('should have checked state styles', () => {
      render(<Checkbox checked={true} data-testid="checkbox" />)
      const checkbox = screen.getByTestId('checkbox')
      expect(checkbox).toHaveClass('data-[state=checked]:bg-primary')
    })
  })

  describe('Accessibility', () => {
    it('should have role checkbox', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('should be keyboard accessible', () => {
      render(<Checkbox data-testid="checkbox" />)
      const checkbox = screen.getByTestId('checkbox')

      checkbox.focus()
      expect(checkbox).toHaveFocus()
    })

    it('should have proper aria-checked attribute', () => {
      render(<Checkbox checked={true} />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true')
    })

    it('should be disabled when disabled prop is true', () => {
      render(<Checkbox disabled />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute('data-disabled', '')
    })
  })

  describe('Ref forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = { current: null }
      render(<Checkbox ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })
})
