import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { Textarea } from '@/components/ui/textarea'

describe('Textarea', () => {
  describe('Rendering', () => {
    it('should render textarea', () => {
      render(<Textarea data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<Textarea data-testid="textarea" />)
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass(
        'flex',
        'min-h-[80px]',
        'w-full',
        'rounded-md',
        'border',
        'border-input',
        'bg-background'
      )
    })

    it('should merge custom className', () => {
      render(<Textarea className="custom-class" data-testid="textarea" />)
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass('custom-class', 'min-h-[80px]')
    })

    it('should render as textarea element', () => {
      render(<Textarea data-testid="textarea" />)
      const textarea = screen.getByTestId('textarea')
      expect(textarea.tagName).toBe('TEXTAREA')
    })
  })

  describe('Value and placeholder', () => {
    it('should render with placeholder', () => {
      render(<Textarea placeholder="Enter your message" />)
      expect(screen.getByPlaceholderText('Enter your message')).toBeInTheDocument()
    })

    it('should render with default value', () => {
      render(<Textarea defaultValue="Initial text" data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toHaveValue('Initial text')
    })

    it('should render with controlled value', () => {
      render(<Textarea value="Controlled text" onChange={() => {}} data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toHaveValue('Controlled text')
    })

    it('should update value on change', async () => {
      const user = userEvent.setup()
      const TestComponent = () => {
        const [value, setValue] = React.useState('')
        return (
          <Textarea
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
            data-testid="textarea"
          />
        )
      }
      render(<TestComponent />)
      const textarea = screen.getByTestId('textarea')

      await user.click(textarea)
      await user.type(textarea, 'New text')
      expect(textarea).toHaveValue('New text')
    })
  })

  describe('Disabled state', () => {
    it('should render disabled when disabled prop is true', () => {
      render(<Textarea disabled data-testid="textarea" />)
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toBeDisabled()
    })

    it('should have disabled classes', () => {
      render(<Textarea disabled data-testid="textarea" />)
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass('disabled:cursor-not-allowed', 'disabled:opacity-50')
    })

    it('should not accept input when disabled', () => {
      render(<Textarea disabled value="Initial" onChange={() => {}} data-testid="textarea" />)
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveValue('Initial')

      // Textarea is disabled, so value shouldn't change
      textarea.textContent = 'New value'
      expect(textarea).toHaveValue('Initial')
    })
  })

  describe('Read-only state', () => {
    it('should render as read-only', () => {
      render(<Textarea readOnly data-testid="textarea" />)
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveAttribute('readonly')
    })

    it('should have value but not accept input when read-only', () => {
      render(<Textarea readOnly value="Read-only text" data-testid="textarea" />)
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveValue('Read-only text')
      expect(textarea).toHaveAttribute('readonly')
    })
  })

  describe('HTML attributes', () => {
    it('should support id attribute', () => {
      render(<Textarea id="message" data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toHaveAttribute('id', 'message')
    })

    it('should support name attribute', () => {
      render(<Textarea name="message" data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toHaveAttribute('name', 'message')
    })

    it('should support rows attribute', () => {
      render(<Textarea rows={5} data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toHaveAttribute('rows', '5')
    })

    it('should support cols attribute', () => {
      render(<Textarea cols={50} data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toHaveAttribute('cols', '50')
    })

    it('should support maxLength attribute', () => {
      render(<Textarea maxLength={100} data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toHaveAttribute('maxLength', '100')
    })

    it('should support data attributes', () => {
      render(<Textarea data-testid="textarea" data-form="contact" />)
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveAttribute('data-form', 'contact')
    })

    it('should support aria-label', () => {
      render(<Textarea aria-label="Message content" data-testid="textarea" />)
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveAttribute('aria-label', 'Message content')
    })
  })

  describe('Callbacks', () => {
    it('should call onChange when value changes', () => {
      const handleChange = vi.fn()
      render(<Textarea onChange={handleChange} data-testid="textarea" />)

      const textarea = screen.getByTestId('textarea')
      textarea.textContent = 'Test'
      textarea.dispatchEvent(new Event('input', { bubbles: true }))

      expect(handleChange).toHaveBeenCalled()
    })

    it('should call onFocus when focused', () => {
      const handleFocus = vi.fn()
      render(<Textarea onFocus={handleFocus} data-testid="textarea" />)

      screen.getByTestId('textarea').focus()
      expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it('should call onBlur when blurred', () => {
      const handleBlur = vi.fn()
      render(<Textarea onBlur={handleBlur} data-testid="textarea" />)

      const textarea = screen.getByTestId('textarea')
      textarea.focus()
      textarea.blur()
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })

    it('should not call onChange when disabled', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()
      render(<Textarea disabled onChange={handleChange} data-testid="textarea" />)

      const textarea = screen.getByTestId('textarea')
      // userEvent respects disabled state and won't type
      await user.click(textarea)
      // Disabled elements shouldn't accept input
      expect(textarea).toBeDisabled()
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Form integration', () => {
    it('should work with labels', () => {
      render(
        <div>
          <label htmlFor="message-textarea">Message</label>
          <Textarea id="message-textarea" />
        </div>
      )
      const label = screen.getByText('Message')
      const textarea = screen.getByLabelText('Message')

      expect(label).toBeInTheDocument()
      expect(textarea).toBeInTheDocument()
    })

    it('should work in forms', () => {
      render(
        <form data-testid="form">
          <Textarea name="message" data-testid="textarea" />
        </form>
      )
      expect(screen.getByTestId('form')).toContainElement(screen.getByTestId('textarea'))
    })

    it('should support required attribute', () => {
      render(<Textarea required data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toBeRequired()
    })
  })

  describe('Styling', () => {
    it('should have focus-visible styles', () => {
      render(<Textarea data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toHaveClass(
        'focus-visible:outline-none',
        'focus-visible:ring-2',
        'focus-visible:ring-ring',
        'focus-visible:ring-offset-2'
      )
    })

    it('should have placeholder styles', () => {
      render(<Textarea data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toHaveClass('placeholder:text-muted-foreground')
    })

    it('should have responsive text size', () => {
      render(<Textarea data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toHaveClass('text-base', 'md:text-sm')
    })

    it('should have minimum height', () => {
      render(<Textarea data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toHaveClass('min-h-[80px]')
    })
  })

  describe('Accessibility', () => {
    it('should be focusable', () => {
      render(<Textarea data-testid="textarea" />)
      const textarea = screen.getByTestId('textarea')

      textarea.focus()
      expect(textarea).toHaveFocus()
    })

    it('should support aria-describedby', () => {
      render(<Textarea aria-describedby="message-help" data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toHaveAttribute('aria-describedby', 'message-help')
    })

    it('should support aria-invalid', () => {
      render(<Textarea aria-invalid="true" data-testid="textarea" />)
      expect(screen.getByTestId('textarea')).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('Ref forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = { current: null }
      render(<Textarea ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
    })

    it('should allow ref methods to be called', () => {
      const ref = React.createRef<HTMLTextAreaElement>()
      render(<Textarea ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
      ref.current?.focus()
      expect(ref.current).toHaveFocus()
    })
  })
})
