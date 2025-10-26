import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test-utils'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/ui/input'
import * as React from 'react'

describe('Input', () => {
  describe('Rendering', () => {
    it('should render input element', () => {
      render(<Input />)
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('should render with placeholder', () => {
      render(<Input placeholder="Enter text..." />)
      expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument()
    })

    it('should render with value', () => {
      render(<Input value="Hello" readOnly />)
      expect(screen.getByRole('textbox')).toHaveValue('Hello')
    })

    it('should apply default classes', () => {
      render(<Input data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('flex', 'h-10', 'w-full', 'rounded-md', 'border')
    })

    it('should merge custom className', () => {
      render(<Input className="custom-class" data-testid="input" />)
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('custom-class', 'h-10')
    })
  })

  describe('Input Types', () => {
    it('should render as text input by default', () => {
      render(<Input />)
      const input = screen.getByRole('textbox')
      // Browser doesn't add type="text" attribute when it's the default
      expect(input).toBeInTheDocument()
    })

    it('should render as password input', () => {
      render(<Input type="password" data-testid="password-input" />)
      const input = screen.getByTestId('password-input')
      expect(input).toHaveAttribute('type', 'password')
    })

    it('should render as email input', () => {
      render(<Input type="email" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
    })

    it('should render as number input', () => {
      render(<Input type="number" />)
      const input = screen.getByRole('spinbutton')
      expect(input).toHaveAttribute('type', 'number')
    })

    it('should render as search input', () => {
      render(<Input type="search" />)
      expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search')
    })

    it('should render as tel input', () => {
      render(<Input type="tel" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel')
    })

    it('should render as url input', () => {
      render(<Input type="url" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'url')
    })

    it('should render as file input', () => {
      render(<Input type="file" data-testid="file-input" />)
      const input = screen.getByTestId('file-input')
      expect(input).toHaveAttribute('type', 'file')
    })
  })

  describe('User Interactions', () => {
    it('should handle text input', async () => {
      const user = userEvent.setup()
      render(<Input />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'Hello World')

      expect(input).toHaveValue('Hello World')
    })

    it('should handle onChange event', async () => {
      const handleChange = vi.fn()
      const user = userEvent.setup()

      render(<Input onChange={handleChange} />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'test')

      expect(handleChange).toHaveBeenCalled()
    })

    it('should handle clear input', async () => {
      const user = userEvent.setup()
      render(<Input defaultValue="Initial" />)

      const input = screen.getByRole('textbox')
      await user.clear(input)

      expect(input).toHaveValue('')
    })

    it('should handle keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Input />)

      const input = screen.getByRole('textbox')
      await user.tab()

      expect(input).toHaveFocus()
    })

    it('should handle blur event', async () => {
      const handleBlur = vi.fn()
      const user = userEvent.setup()

      render(<Input onBlur={handleBlur} />)

      const input = screen.getByRole('textbox')
      await user.click(input)
      await user.tab()

      expect(handleBlur).toHaveBeenCalled()
    })

    it('should handle focus event', async () => {
      const handleFocus = vi.fn()
      const user = userEvent.setup()

      render(<Input onFocus={handleFocus} />)

      const input = screen.getByRole('textbox')
      await user.click(input)

      expect(handleFocus).toHaveBeenCalled()
    })
  })

  describe('States', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled />)
      expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('should not accept input when disabled', async () => {
      const user = userEvent.setup()
      render(<Input disabled />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'test')

      expect(input).toHaveValue('')
    })

    it('should have disabled cursor class when disabled', () => {
      render(<Input disabled data-testid="input" />)
      expect(screen.getByTestId('input')).toHaveClass('disabled:cursor-not-allowed')
    })

    it('should have disabled opacity class when disabled', () => {
      render(<Input disabled data-testid="input" />)
      expect(screen.getByTestId('input')).toHaveClass('disabled:opacity-50')
    })

    it('should be readonly when readOnly prop is true', () => {
      render(<Input readOnly />)
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly')
    })

    it('should display value but not accept input when readonly', async () => {
      const user = userEvent.setup()
      render(<Input value="readonly value" readOnly />)

      const input = screen.getByRole('textbox')
      await user.type(input, 'new text')

      expect(input).toHaveValue('readonly value')
    })

    it('should be required when required prop is true', () => {
      render(<Input required />)
      expect(screen.getByRole('textbox')).toBeRequired()
    })
  })

  describe('HTML Attributes', () => {
    it('should support name attribute', () => {
      render(<Input name="username" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('name', 'username')
    })

    it('should support id attribute', () => {
      render(<Input id="email-input" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'email-input')
    })

    it('should support maxLength attribute', () => {
      render(<Input maxLength={10} />)
      expect(screen.getByRole('textbox')).toHaveAttribute('maxLength', '10')
    })

    it('should support minLength attribute', () => {
      render(<Input minLength={3} />)
      expect(screen.getByRole('textbox')).toHaveAttribute('minLength', '3')
    })

    it('should support pattern attribute', () => {
      render(<Input pattern="[A-Za-z]+" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('pattern', '[A-Za-z]+')
    })

    it('should support autocomplete attribute', () => {
      render(<Input autoComplete="email" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'email')
    })

    it('should support aria-label', () => {
      render(<Input aria-label="Search query" />)
      expect(screen.getByRole('textbox')).toHaveAccessibleName('Search query')
    })

    it('should support aria-describedby', () => {
      render(<Input aria-describedby="help-text" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-describedby', 'help-text')
    })

    it('should support data attributes', () => {
      render(<Input data-testid="custom-input" data-form="login" />)
      const input = screen.getByTestId('custom-input')
      expect(input).toHaveAttribute('data-form', 'login')
    })
  })

  describe('Ref forwarding', () => {
    it('should forward ref correctly', () => {
      const ref = { current: null }
      render(<Input ref={ref} />)
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })

    it('should allow ref access to input methods', () => {
      const ref = { current: null }
      render(<Input ref={ref} />)

      // @ts-expect-error - ref.current is not null
      ref.current?.focus()
      expect(ref.current).toHaveFocus()
    })
  })

  describe('Accessibility', () => {
    it('should have focus-visible ring classes', () => {
      render(<Input data-testid="input" />)
      expect(screen.getByTestId('input')).toHaveClass(
        'focus-visible:outline-none',
        'focus-visible:ring-2'
      )
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(<Input />)

      await user.tab()
      expect(screen.getByRole('textbox')).toHaveFocus()
    })

    it('should support aria-invalid for validation', () => {
      render(<Input aria-invalid="true" />)
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
    })
  })

  describe('Controlled vs Uncontrolled', () => {
    it('should work as uncontrolled component with defaultValue', () => {
      render(<Input defaultValue="Initial value" />)
      expect(screen.getByRole('textbox')).toHaveValue('Initial value')
    })

    it('should work as controlled component', async () => {
      const ControlledInput = () => {
        const [value, setValue] = React.useState('controlled')
        return <Input value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
      }

      const user = userEvent.setup()
      render(<ControlledInput />)

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('controlled')

      await user.clear(input)
      await user.type(input, 'new value')
      expect(input).toHaveValue('new value')
    })
  })
})
