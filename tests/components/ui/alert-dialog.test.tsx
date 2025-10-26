import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '../../test-utils'
import { userEvent } from '@testing-library/user-event'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'

describe('AlertDialog', () => {
  describe('Rendering', () => {
    it('should render trigger button', () => {
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open Dialog</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Title</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      )
      expect(screen.getByText('Open Dialog')).toBeInTheDocument()
    })

    it('should not render content initially when closed', () => {
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Dialog Title</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      )
      expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument()
    })

    it('should render content when open', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Dialog Title</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        expect(screen.getByText('Dialog Title')).toBeInTheDocument()
      })
    })
  })

  describe('AlertDialogContent', () => {
    it('should apply default classes', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent data-testid="content">
            <AlertDialogTitle>Title</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        const content = screen.getByTestId('content')
        expect(content).toHaveClass('fixed', 'grid', 'border', 'bg-background', 'p-6', 'shadow-lg')
      })
    })

    it('should merge custom className', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent className="custom-content" data-testid="content">
            <AlertDialogTitle>Title</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        expect(screen.getByTestId('content')).toHaveClass('custom-content', 'fixed')
      })
    })
  })

  describe('AlertDialogHeader', () => {
    it('should render header', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader data-testid="header">
              <AlertDialogTitle>Header Title</AlertDialogTitle>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        expect(screen.getByTestId('header')).toBeInTheDocument()
        expect(screen.getByTestId('header')).toHaveClass('flex', 'flex-col', 'space-y-2')
      })
    })
  })

  describe('AlertDialogFooter', () => {
    it('should render footer', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Title</AlertDialogTitle>
            <AlertDialogFooter data-testid="footer">
              <AlertDialogAction>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        expect(screen.getByTestId('footer')).toBeInTheDocument()
        expect(screen.getByTestId('footer')).toHaveClass('flex', 'flex-col-reverse')
      })
    })
  })

  describe('AlertDialogTitle', () => {
    it('should render title text', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        expect(screen.getByText('Are you sure?')).toBeInTheDocument()
      })
    })

    it('should apply title classes', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle data-testid="title">Title</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        expect(screen.getByTestId('title')).toHaveClass('text-lg', 'font-semibold')
      })
    })
  })

  describe('AlertDialogDescription', () => {
    it('should render description text', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Title</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument()
      })
    })

    it('should apply description classes', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Title</AlertDialogTitle>
            <AlertDialogDescription data-testid="description">Description</AlertDialogDescription>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        expect(screen.getByTestId('description')).toHaveClass('text-sm', 'text-muted-foreground')
      })
    })
  })

  describe('AlertDialogAction', () => {
    it('should render action button', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Title</AlertDialogTitle>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        expect(screen.getByText('Confirm')).toBeInTheDocument()
      })
    })

    it('should call onClick handler', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Title</AlertDialogTitle>
            <AlertDialogAction onClick={handleClick}>Confirm</AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        expect(screen.getByText('Confirm')).toBeInTheDocument()
      })

      await user.click(screen.getByText('Confirm'))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('AlertDialogCancel', () => {
    it('should render cancel button', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Title</AlertDialogTitle>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        expect(screen.getByText('Cancel')).toBeInTheDocument()
      })
    })

    it('should close dialog when clicked', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Dialog Title</AlertDialogTitle>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        expect(screen.getByText('Dialog Title')).toBeInTheDocument()
      })

      await user.click(screen.getByText('Cancel'))
      await waitFor(() => {
        expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument()
      })
    })
  })

  describe('Complete Dialog', () => {
    it('should render complete dialog with all parts', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Delete Account</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Delete Account'))

      await waitFor(() => {
        expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument()
        expect(
          screen.getByText('This action cannot be undone. This will permanently delete your account.')
        ).toBeInTheDocument()
        expect(screen.getByText('Cancel')).toBeInTheDocument()
        expect(screen.getByText('Continue')).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper dialog role', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Accessible Dialog</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        expect(screen.getByRole('alertdialog')).toBeInTheDocument()
      })
    })

    it('should be keyboard accessible with Escape key', async () => {
      const user = userEvent.setup()
      render(
        <AlertDialog>
          <AlertDialogTrigger>Open</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogTitle>Dialog Title</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      )

      await user.click(screen.getByText('Open'))
      await waitFor(() => {
        expect(screen.getByText('Dialog Title')).toBeInTheDocument()
      })

      await user.keyboard('{Escape}')
      await waitFor(() => {
        expect(screen.queryByText('Dialog Title')).not.toBeInTheDocument()
      })
    })
  })

  describe('Controlled State', () => {
    it('should support controlled open state', () => {
      const { rerender } = render(
        <AlertDialog open={false}>
          <AlertDialogContent>
            <AlertDialogTitle>Controlled Dialog</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      )

      expect(screen.queryByText('Controlled Dialog')).not.toBeInTheDocument()

      rerender(
        <AlertDialog open={true}>
          <AlertDialogContent>
            <AlertDialogTitle>Controlled Dialog</AlertDialogTitle>
          </AlertDialogContent>
        </AlertDialog>
      )

      expect(screen.getByText('Controlled Dialog')).toBeInTheDocument()
    })
  })
})
