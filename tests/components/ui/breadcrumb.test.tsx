import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb'

describe('Breadcrumb', () => {
  describe('Breadcrumb Container', () => {
    it('should render as nav element', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByRole('navigation')).toBeInTheDocument()
    })

    it('should have breadcrumb aria-label', () => {
      render(
        <Breadcrumb data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      const nav = screen.getByTestId('breadcrumb')
      expect(nav).toHaveAttribute('aria-label', 'breadcrumb')
    })

    it('should merge custom className', () => {
      render(
        <Breadcrumb className="custom-breadcrumb" data-testid="breadcrumb">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByTestId('breadcrumb')).toHaveClass('custom-breadcrumb')
    })
  })

  describe('BreadcrumbList', () => {
    it('should render as ordered list', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList data-testid="list">
            <BreadcrumbItem>Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      const list = screen.getByTestId('list')
      expect(list.tagName).toBe('OL')
    })

    it('should apply default classes', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList data-testid="list">
            <BreadcrumbItem>Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByTestId('list')).toHaveClass('flex', 'flex-wrap', 'items-center', 'gap-1.5')
    })
  })

  describe('BreadcrumbItem', () => {
    it('should render as list item', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem data-testid="item">Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      const item = screen.getByTestId('item')
      expect(item.tagName).toBe('LI')
    })

    it('should apply default classes', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem data-testid="item">Home</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByTestId('item')).toHaveClass('inline-flex', 'items-center')
    })
  })

  describe('BreadcrumbLink', () => {
    it('should render link text', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByText('Home')).toBeInTheDocument()
    })

    it('should have href attribute', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard" data-testid="link">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByTestId('link')).toHaveAttribute('href', '/dashboard')
    })

    it('should apply hover classes', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" data-testid="link">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByTestId('link')).toHaveClass('hover:text-foreground', 'transition-colors')
    })
  })

  describe('BreadcrumbPage', () => {
    it('should render current page text', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByText('Current Page')).toBeInTheDocument()
    })

    it('should have aria-current="page"', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage data-testid="page">Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByTestId('page')).toHaveAttribute('aria-current', 'page')
    })

    it('should have aria-disabled="true"', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage data-testid="page">Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByTestId('page')).toHaveAttribute('aria-disabled', 'true')
    })

    it('should have role="link"', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Current Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByRole('link')).toBeInTheDocument()
    })
  })

  describe('BreadcrumbSeparator', () => {
    it('should render default separator icon', () => {
      const { container } = render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should render custom separator', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Page</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByText('/')).toBeInTheDocument()
    })

    it('should have role="presentation"', () => {
      const { container } = render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator data-testid="separator" />
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByTestId('separator')).toHaveAttribute('role', 'presentation')
    })

    it('should be aria-hidden', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator data-testid="separator" />
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByTestId('separator')).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('BreadcrumbEllipsis', () => {
    it('should render ellipsis icon', () => {
      const { container } = render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should have screen reader text', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByText('More')).toBeInTheDocument()
    })

    it('should be aria-hidden', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbEllipsis data-testid="ellipsis" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
      expect(screen.getByTestId('ellipsis')).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Complete Breadcrumb', () => {
    it('should render full breadcrumb navigation', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Components</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('Docs')).toBeInTheDocument()
      expect(screen.getByText('Components')).toBeInTheDocument()
    })

    it('should render breadcrumb with ellipsis', () => {
      render(
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Current</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('More')).toBeInTheDocument()
      expect(screen.getByText('Current')).toBeInTheDocument()
    })
  })
})
