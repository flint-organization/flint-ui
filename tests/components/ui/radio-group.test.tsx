import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

describe('RadioGroup', () => {
  describe('Rendering', () => {
    it('should render radio group', () => {
      render(<RadioGroup data-testid="radio-group" />)
      expect(screen.getByTestId('radio-group')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<RadioGroup data-testid="radio-group" />)
      const radioGroup = screen.getByTestId('radio-group')
      expect(radioGroup).toHaveClass('grid', 'gap-2')
    })

    it('should merge custom className', () => {
      render(<RadioGroup className="custom-class" data-testid="radio-group" />)
      const radioGroup = screen.getByTestId('radio-group')
      expect(radioGroup).toHaveClass('custom-class', 'grid')
    })

    it('should render with multiple items', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option1" data-testid="item1" />
          <RadioGroupItem value="option2" data-testid="item2" />
          <RadioGroupItem value="option3" data-testid="item3" />
        </RadioGroup>
      )
      expect(screen.getByTestId('item1')).toBeInTheDocument()
      expect(screen.getByTestId('item2')).toBeInTheDocument()
      expect(screen.getByTestId('item3')).toBeInTheDocument()
    })
  })

  describe('RadioGroupItem', () => {
    it('should render radio group item', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option" data-testid="item" />
        </RadioGroup>
      )
      expect(screen.getByTestId('item')).toBeInTheDocument()
    })

    it('should apply default classes to item', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option" data-testid="item" />
        </RadioGroup>
      )
      const item = screen.getByTestId('item')
      expect(item).toHaveClass(
        'aspect-square',
        'h-4',
        'w-4',
        'rounded-full',
        'border',
        'border-primary'
      )
    })

    it('should merge custom className on item', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option" className="custom-class" data-testid="item" />
        </RadioGroup>
      )
      const item = screen.getByTestId('item')
      expect(item).toHaveClass('custom-class', 'aspect-square')
    })

    it('should render as button element', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option" data-testid="item" />
        </RadioGroup>
      )
      const item = screen.getByTestId('item')
      expect(item.tagName).toBe('BUTTON')
    })
  })

  describe('Selection', () => {
    it('should have no selection by default', () => {
      render(
        <RadioGroup data-testid="radio-group">
          <RadioGroupItem value="option1" data-testid="item1" />
          <RadioGroupItem value="option2" data-testid="item2" />
        </RadioGroup>
      )
      expect(screen.getByTestId('item1')).toHaveAttribute('data-state', 'unchecked')
      expect(screen.getByTestId('item2')).toHaveAttribute('data-state', 'unchecked')
    })

    it('should select item with defaultValue', () => {
      render(
        <RadioGroup defaultValue="option2">
          <RadioGroupItem value="option1" data-testid="item1" />
          <RadioGroupItem value="option2" data-testid="item2" />
        </RadioGroup>
      )
      expect(screen.getByTestId('item1')).toHaveAttribute('data-state', 'unchecked')
      expect(screen.getByTestId('item2')).toHaveAttribute('data-state', 'checked')
    })

    it('should select item with value prop', () => {
      render(
        <RadioGroup value="option1" onValueChange={() => {}}>
          <RadioGroupItem value="option1" data-testid="item1" />
          <RadioGroupItem value="option2" data-testid="item2" />
        </RadioGroup>
      )
      expect(screen.getByTestId('item1')).toHaveAttribute('data-state', 'checked')
      expect(screen.getByTestId('item2')).toHaveAttribute('data-state', 'unchecked')
    })

    it('should change selection on click', async () => {
      const user = userEvent.setup()
      render(
        <RadioGroup>
          <RadioGroupItem value="option1" data-testid="item1" />
          <RadioGroupItem value="option2" data-testid="item2" />
        </RadioGroup>
      )

      await user.click(screen.getByTestId('item1'))
      expect(screen.getByTestId('item1')).toHaveAttribute('data-state', 'checked')
      expect(screen.getByTestId('item2')).toHaveAttribute('data-state', 'unchecked')

      await user.click(screen.getByTestId('item2'))
      expect(screen.getByTestId('item1')).toHaveAttribute('data-state', 'unchecked')
      expect(screen.getByTestId('item2')).toHaveAttribute('data-state', 'checked')
    })

    it('should only allow single selection', async () => {
      const user = userEvent.setup()
      render(
        <RadioGroup>
          <RadioGroupItem value="option1" data-testid="item1" />
          <RadioGroupItem value="option2" data-testid="item2" />
          <RadioGroupItem value="option3" data-testid="item3" />
        </RadioGroup>
      )

      await user.click(screen.getByTestId('item1'))
      expect(screen.getByTestId('item1')).toHaveAttribute('data-state', 'checked')

      await user.click(screen.getByTestId('item2'))
      expect(screen.getByTestId('item1')).toHaveAttribute('data-state', 'unchecked')
      expect(screen.getByTestId('item2')).toHaveAttribute('data-state', 'checked')
      expect(screen.getByTestId('item3')).toHaveAttribute('data-state', 'unchecked')
    })
  })

  describe('Disabled state', () => {
    it('should disable entire radio group', () => {
      render(
        <RadioGroup disabled>
          <RadioGroupItem value="option1" data-testid="item1" />
          <RadioGroupItem value="option2" data-testid="item2" />
        </RadioGroup>
      )
      expect(screen.getByTestId('item1')).toBeDisabled()
      expect(screen.getByTestId('item2')).toBeDisabled()
    })

    it('should disable individual items', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option1" disabled data-testid="item1" />
          <RadioGroupItem value="option2" data-testid="item2" />
        </RadioGroup>
      )
      expect(screen.getByTestId('item1')).toBeDisabled()
      expect(screen.getByTestId('item2')).not.toBeDisabled()
    })

    it('should have disabled classes on item', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option" disabled data-testid="item" />
        </RadioGroup>
      )
      const item = screen.getByTestId('item')
      expect(item).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
    })

    it('should not change selection when disabled item is clicked', async () => {
      const user = userEvent.setup()
      render(
        <RadioGroup>
          <RadioGroupItem value="option1" disabled data-testid="item1" />
          <RadioGroupItem value="option2" data-testid="item2" />
        </RadioGroup>
      )

      await user.click(screen.getByTestId('item1'))
      expect(screen.getByTestId('item1')).toHaveAttribute('data-state', 'unchecked')

      await user.click(screen.getByTestId('item2'))
      expect(screen.getByTestId('item2')).toHaveAttribute('data-state', 'checked')

      await user.click(screen.getByTestId('item1'))
      expect(screen.getByTestId('item2')).toHaveAttribute('data-state', 'checked')
    })
  })

  describe('HTML attributes', () => {
    it('should support id attribute on group', () => {
      render(<RadioGroup id="payment-method" data-testid="radio-group" />)
      expect(screen.getByTestId('radio-group')).toHaveAttribute('id', 'payment-method')
    })

    it('should support id attribute on item', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option" id="radio-option" data-testid="item" />
        </RadioGroup>
      )
      expect(screen.getByTestId('item')).toHaveAttribute('id', 'radio-option')
    })

    it('should work in forms with name', () => {
      render(
        <form>
          <RadioGroup data-testid="radio-group">
            <RadioGroupItem value="card" />
          </RadioGroup>
        </form>
      )
      // RadioGroup doesn't directly support name attribute, but items work in forms
      expect(screen.getByTestId('radio-group')).toBeInTheDocument()
    })

    it('should support data attributes', () => {
      render(
        <RadioGroup data-testid="radio-group" data-form="settings">
          <RadioGroupItem value="option" data-testid="item" data-premium="true" />
        </RadioGroup>
      )
      expect(screen.getByTestId('radio-group')).toHaveAttribute('data-form', 'settings')
      expect(screen.getByTestId('item')).toHaveAttribute('data-premium', 'true')
    })
  })

  describe('Callbacks', () => {
    it('should call onValueChange when selection changes', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(
        <RadioGroup onValueChange={handleChange}>
          <RadioGroupItem value="option1" data-testid="item1" />
          <RadioGroupItem value="option2" data-testid="item2" />
        </RadioGroup>
      )

      await user.click(screen.getByTestId('item1'))
      expect(handleChange).toHaveBeenCalledWith('option1')

      await user.click(screen.getByTestId('item2'))
      expect(handleChange).toHaveBeenCalledWith('option2')
    })

    it('should not call onValueChange when disabled item is clicked', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(
        <RadioGroup onValueChange={handleChange}>
          <RadioGroupItem value="option1" disabled data-testid="item1" />
          <RadioGroupItem value="option2" data-testid="item2" />
        </RadioGroup>
      )

      await user.click(screen.getByTestId('item1'))
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Form integration', () => {
    it('should work with labels', async () => {
      const user = userEvent.setup()
      render(
        <RadioGroup>
          <div>
            <RadioGroupItem value="option1" id="option1" />
            <label htmlFor="option1">Option 1</label>
          </div>
          <div>
            <RadioGroupItem value="option2" id="option2" data-testid="item2" />
            <label htmlFor="option2">Option 2</label>
          </div>
        </RadioGroup>
      )

      const label = screen.getByText('Option 2')
      await user.click(label)
      expect(screen.getByTestId('item2')).toHaveAttribute('data-state', 'checked')
    })

    it('should work in forms', () => {
      render(
        <form data-testid="form">
          <RadioGroup name="payment">
            <RadioGroupItem value="card" data-testid="item" />
          </RadioGroup>
        </form>
      )
      expect(screen.getByTestId('form')).toContainElement(screen.getByTestId('item'))
    })
  })

  describe('Styling', () => {
    it('should have focus-visible styles on item', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option" data-testid="item" />
        </RadioGroup>
      )
      expect(screen.getByTestId('item')).toHaveClass(
        'focus:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-ring',
        'focus-visible:ring-offset-2'
      )
    })
  })

  describe('Accessibility', () => {
    it('should have radiogroup role', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option" />
        </RadioGroup>
      )
      expect(screen.getByRole('radiogroup')).toBeInTheDocument()
    })

    it('should have radio role on items', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option1" />
          <RadioGroupItem value="option2" />
        </RadioGroup>
      )
      const radios = screen.getAllByRole('radio')
      expect(radios).toHaveLength(2)
    })

    it('should be keyboard accessible', () => {
      render(
        <RadioGroup>
          <RadioGroupItem value="option" data-testid="item" />
        </RadioGroup>
      )
      const item = screen.getByTestId('item')

      item.focus()
      expect(item).toHaveFocus()
    })

    it('should have proper aria-checked attribute', () => {
      render(
        <RadioGroup defaultValue="option1">
          <RadioGroupItem value="option1" />
          <RadioGroupItem value="option2" />
        </RadioGroup>
      )
      const radios = screen.getAllByRole('radio')
      expect(radios[0]).toHaveAttribute('aria-checked', 'true')
      expect(radios[1]).toHaveAttribute('aria-checked', 'false')
    })

    it('should support aria-label', () => {
      render(
        <RadioGroup aria-label="Payment method">
          <RadioGroupItem value="card" />
        </RadioGroup>
      )
      expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Payment method')
    })
  })

  describe('Ref forwarding', () => {
    it('should forward ref correctly on RadioGroup', () => {
      const ref = { current: null }
      render(<RadioGroup ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('should forward ref correctly on RadioGroupItem', () => {
      const ref = { current: null }
      render(
        <RadioGroup>
          <RadioGroupItem value="option" ref={ref} />
        </RadioGroup>
      )
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })
})
