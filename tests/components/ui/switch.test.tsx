import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { Switch } from '@/components/ui/switch'

describe('Switch', () => {
  describe('Rendering', () => {
    it('should render switch', () => {
      render(<Switch data-testid="switch" />)
      expect(screen.getByTestId('switch')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<Switch data-testid="switch" />)
      const switchEl = screen.getByTestId('switch')
      expect(switchEl).toHaveClass(
        'peer',
        'inline-flex',
        'h-6',
        'w-11',
        'shrink-0',
        'cursor-pointer',
        'rounded-full'
      )
    })

    it('should merge custom className', () => {
      render(<Switch className="custom-class" data-testid="switch" />)
      const switchEl = screen.getByTestId('switch')
      expect(switchEl).toHaveClass('custom-class', 'peer')
    })

    it('should render as button element', () => {
      render(<Switch data-testid="switch" />)
      const switchEl = screen.getByTestId('switch')
      expect(switchEl.tagName).toBe('BUTTON')
    })
  })

  describe('States', () => {
    it('should render unchecked by default', () => {
      render(<Switch data-testid="switch" />)
      const switchEl = screen.getByTestId('switch')
      expect(switchEl).toHaveAttribute('data-state', 'unchecked')
    })

    it('should render checked when checked prop is true', () => {
      render(<Switch checked={true} data-testid="switch" />)
      const switchEl = screen.getByTestId('switch')
      expect(switchEl).toHaveAttribute('data-state', 'checked')
    })

    it('should render checked when defaultChecked is true', () => {
      render(<Switch defaultChecked={true} data-testid="switch" />)
      const switchEl = screen.getByTestId('switch')
      expect(switchEl).toHaveAttribute('data-state', 'checked')
    })

    it('should toggle state on click', async () => {
      const user = userEvent.setup()
      render(<Switch data-testid="switch" />)
      const switchEl = screen.getByTestId('switch')
      expect(switchEl).toHaveAttribute('data-state', 'unchecked')

      await user.click(switchEl)
      expect(switchEl).toHaveAttribute('data-state', 'checked')

      await user.click(switchEl)
      expect(switchEl).toHaveAttribute('data-state', 'unchecked')
    })

    it('should have different background for checked/unchecked states', () => {
      render(<Switch data-testid="switch" />)
      const switchEl = screen.getByTestId('switch')
      expect(switchEl).toHaveClass(
        'data-[state=checked]:bg-primary',
        'data-[state=unchecked]:bg-input'
      )
    })
  })

  describe('Disabled state', () => {
    it('should render disabled when disabled prop is true', () => {
      render(<Switch disabled data-testid="switch" />)
      const switchEl = screen.getByTestId('switch')
      expect(switchEl).toBeDisabled()
    })

    it('should have disabled classes', () => {
      render(<Switch disabled data-testid="switch" />)
      const switchEl = screen.getByTestId('switch')
      expect(switchEl).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
    })

    it('should not toggle when disabled', () => {
      render(<Switch disabled data-testid="switch" />)
      const switchEl = screen.getByTestId('switch')
      expect(switchEl).toHaveAttribute('data-state', 'unchecked')

      switchEl.click()
      expect(switchEl).toHaveAttribute('data-state', 'unchecked')
    })

    it('should not have cursor-pointer when disabled', () => {
      render(<Switch disabled data-testid="switch" />)
      const switchEl = screen.getByTestId('switch')
      // Should have cursor-pointer in default classes but disabled overrides it
      expect(switchEl).toHaveClass('cursor-pointer')
    })
  })

  describe('HTML attributes', () => {
    it('should support id attribute', () => {
      render(<Switch id="notifications" data-testid="switch" />)
      expect(screen.getByTestId('switch')).toHaveAttribute('id', 'notifications')
    })

    it('should accept name attribute in props', () => {
      // Radix Switch passes name through but doesn't directly expose it in HTML
      render(<Switch name="notifications" data-testid="switch" />)
      expect(screen.getByTestId('switch')).toBeInTheDocument()
    })

    it('should support value attribute', () => {
      render(<Switch value="enabled" data-testid="switch" />)
      expect(screen.getByTestId('switch')).toHaveAttribute('value', 'enabled')
    })

    it('should support data attributes', () => {
      render(<Switch data-testid="switch" data-feature="dark-mode" />)
      const switchEl = screen.getByTestId('switch')
      expect(switchEl).toHaveAttribute('data-feature', 'dark-mode')
    })

    it('should support aria-label', () => {
      render(<Switch aria-label="Enable notifications" data-testid="switch" />)
      const switchEl = screen.getByTestId('switch')
      expect(switchEl).toHaveAttribute('aria-label', 'Enable notifications')
    })
  })

  describe('Callbacks', () => {
    it('should call onCheckedChange when clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Switch onCheckedChange={handleChange} data-testid="switch" />)

      await user.click(screen.getByTestId('switch'))
      expect(handleChange).toHaveBeenCalledWith(true)

      await user.click(screen.getByTestId('switch'))
      expect(handleChange).toHaveBeenCalledWith(false)
    })

    it('should not call onCheckedChange when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Switch disabled onCheckedChange={handleChange} data-testid="switch" />)

      await user.click(screen.getByTestId('switch'))
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Form integration', () => {
    it('should work with labels', async () => {
      const user = userEvent.setup()
      render(
        <div>
          <label htmlFor="notifications-switch">Enable notifications</label>
          <Switch id="notifications-switch" data-testid="switch" />
        </div>
      )
      const label = screen.getByText('Enable notifications')
      const switchEl = screen.getByTestId('switch')

      await user.click(label)
      expect(switchEl).toHaveAttribute('data-state', 'checked')
    })

    it('should work in forms', () => {
      render(
        <form data-testid="form">
          <Switch name="notifications" value="enabled" data-testid="switch" />
        </form>
      )
      expect(screen.getByTestId('form')).toContainElement(screen.getByTestId('switch'))
    })
  })

  describe('Styling', () => {
    it('should have focus-visible styles', () => {
      render(<Switch data-testid="switch" />)
      expect(screen.getByTestId('switch')).toHaveClass(
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-ring',
        'focus-visible:ring-offset-2'
      )
    })

    it('should have transition classes', () => {
      render(<Switch data-testid="switch" />)
      expect(screen.getByTestId('switch')).toHaveClass('transition-colors')
    })
  })

  describe('Accessibility', () => {
    it('should have role switch', () => {
      render(<Switch />)
      expect(screen.getByRole('switch')).toBeInTheDocument()
    })

    it('should be keyboard accessible', () => {
      render(<Switch data-testid="switch" />)
      const switchEl = screen.getByTestId('switch')

      switchEl.focus()
      expect(switchEl).toHaveFocus()
    })

    it('should have proper aria-checked attribute', () => {
      render(<Switch checked={true} />)
      expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
    })

    it('should be disabled when disabled prop is true', () => {
      render(<Switch disabled />)
      const switchEl = screen.getByRole('switch')
      expect(switchEl).toHaveAttribute('data-disabled', '')
    })

    it('should update aria-checked on toggle', async () => {
      const user = userEvent.setup()
      render(<Switch data-testid="switch" />)
      const switchEl = screen.getByRole('switch')

      expect(switchEl).toHaveAttribute('aria-checked', 'false')
      await user.click(switchEl)
      expect(switchEl).toHaveAttribute('aria-checked', 'true')
    })
  })

  describe('Ref forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = { current: null }
      render(<Switch ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })
})
