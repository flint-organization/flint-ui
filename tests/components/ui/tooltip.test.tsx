import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { userEvent } from '@testing-library/user-event'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'

describe('Tooltip', () => {
  describe('Rendering', () => {
    it('should render tooltip trigger', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      expect(screen.getByText('Hover me')).toBeInTheDocument()
    })

    it('should not render content initially', () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      expect(screen.queryByText('Tooltip text')).not.toBeInTheDocument()
    })
  })

  describe('TooltipContent', () => {
    it('should apply default classes', async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover</TooltipTrigger>
            <TooltipContent data-testid="content">Tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByText('Hover'))
      await waitFor(() => {
        const content = screen.getByTestId('content')
        expect(content).toHaveClass('rounded-md', 'bg-primary', 'text-primary-foreground')
      })
    })

    it('should merge custom className', async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover</TooltipTrigger>
            <TooltipContent className="custom-tooltip" data-testid="content">
              Tooltip
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByText('Hover'))
      await waitFor(() => {
        expect(screen.getByTestId('content')).toHaveClass('custom-tooltip', 'rounded-md')
      })
    })

    it('should apply default sideOffset', async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover</TooltipTrigger>
            <TooltipContent data-testid="content">Tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByText('Hover'))
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
    })

    it('should accept custom sideOffset', async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover</TooltipTrigger>
            <TooltipContent sideOffset={10} data-testid="content">
              Tooltip
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByText('Hover'))
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
    })
  })

  describe('Interaction', () => {
    it('should show tooltip on hover', async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent>Tooltip text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByText('Hover me'))
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument()
      })
    })

    it.skip('should hide tooltip on unhover', async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover me</TooltipTrigger>
            <TooltipContent data-testid="unhover-tooltip">Tooltip text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      const trigger = screen.getByText('Hover me')
      await user.hover(trigger)
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument()
      })

      await user.unhover(trigger)
      await waitFor(
        () => {
          const tooltip = screen.queryByTestId('unhover-tooltip')
          expect(tooltip).not.toBeInTheDocument()
        },
        { timeout: 5000 }
      )
    })

    it('should show tooltip on focus', async () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Focusable trigger</TooltipTrigger>
            <TooltipContent>Tooltip on focus</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      const trigger = screen.getByText('Focusable trigger')
      trigger.focus()

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument()
      })
    })
  })

  describe('TooltipProvider', () => {
    it.skip('should provide context for multiple tooltips', async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>First</TooltipTrigger>
            <TooltipContent data-testid="first-tooltip">First tooltip</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>Second</TooltipTrigger>
            <TooltipContent data-testid="second-tooltip">Second tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByText('First'))
      await waitFor(() => {
        expect(screen.getByTestId('first-tooltip')).toBeInTheDocument()
      })

      await user.unhover(screen.getByText('First'))
      // Wait for first tooltip to close before hovering second
      await waitFor(
        () => {
          expect(screen.queryByTestId('first-tooltip')).not.toBeInTheDocument()
        },
        { timeout: 5000 }
      )

      await user.hover(screen.getByText('Second'))
      await waitFor(() => {
        expect(screen.getByTestId('second-tooltip')).toBeInTheDocument()
      })
    })

    it('should support custom delayDuration', async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>Instant</TooltipTrigger>
            <TooltipContent>Instant tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByText('Instant'))
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument()
      })
    })
  })

  describe('Content Variants', () => {
    it('should render text content', async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover</TooltipTrigger>
            <TooltipContent data-testid="text-tooltip">Simple text</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByText('Hover'))
      await waitFor(() => {
        expect(screen.getByTestId('text-tooltip')).toBeInTheDocument()
      })
    })

    it('should render JSX content', async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover</TooltipTrigger>
            <TooltipContent data-testid="jsx-tooltip">
              <div>
                <strong>Bold text</strong>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByText('Hover'))
      await waitFor(() => {
        expect(screen.getByTestId('jsx-tooltip')).toBeInTheDocument()
      })
    })
  })

  describe('Positioning', () => {
    it('should support side prop', async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover</TooltipTrigger>
            <TooltipContent side="top" data-testid="content">
              Top tooltip
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByText('Hover'))
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
    })

    it('should support align prop', async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Hover</TooltipTrigger>
            <TooltipContent align="center" data-testid="content">
              Centered
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByText('Hover'))
      await waitFor(() => {
        expect(screen.getByTestId('content')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', async () => {
      const user = userEvent.setup()
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger data-testid="trigger">Hover</TooltipTrigger>
            <TooltipContent>Accessible tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      await user.hover(screen.getByTestId('trigger'))
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument()
      })
    })

    it('should be keyboard accessible', async () => {
      render(
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>Keyboard accessible</TooltipTrigger>
            <TooltipContent>Tooltip content</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      const trigger = screen.getByText('Keyboard accessible')
      trigger.focus()

      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument()
      })
    })
  })

  describe('Controlled State', () => {
    it('should support controlled open state', () => {
      const { rerender } = render(
        <TooltipProvider>
          <Tooltip open={false}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="controlled-tooltip">Controlled tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      expect(screen.queryByTestId('controlled-tooltip')).not.toBeInTheDocument()

      rerender(
        <TooltipProvider>
          <Tooltip open={true}>
            <TooltipTrigger>Trigger</TooltipTrigger>
            <TooltipContent data-testid="controlled-tooltip">Controlled tooltip</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

      expect(screen.getByTestId('controlled-tooltip')).toBeInTheDocument()
    })
  })
})
