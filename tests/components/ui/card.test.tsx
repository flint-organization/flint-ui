import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

describe('Card', () => {
  describe('Card', () => {
    it('should render with children', () => {
      render(<Card>Card content</Card>)
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<Card data-testid="card">Content</Card>)
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-card', 'shadow-sm')
    })

    it('should merge custom className', () => {
      render(
        <Card className="custom-class" data-testid="card">
          Content
        </Card>
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveClass('custom-class', 'rounded-lg')
    })

    it('should forward ref', () => {
      const ref = { current: null }
      render(<Card ref={ref}>Content</Card>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('should spread HTML attributes', () => {
      render(
        <Card data-testid="card" id="test-id">
          Content
        </Card>
      )
      const card = screen.getByTestId('card')
      expect(card).toHaveAttribute('id', 'test-id')
    })
  })

  describe('CardHeader', () => {
    it('should render with children', () => {
      render(<CardHeader>Header content</CardHeader>)
      expect(screen.getByText('Header content')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<CardHeader data-testid="header">Content</CardHeader>)
      const header = screen.getByTestId('header')
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
    })

    it('should merge custom className', () => {
      render(
        <CardHeader className="custom-header" data-testid="header">
          Content
        </CardHeader>
      )
      expect(screen.getByTestId('header')).toHaveClass('custom-header', 'p-6')
    })
  })

  describe('CardTitle', () => {
    it('should render with children', () => {
      render(<CardTitle>Title text</CardTitle>)
      expect(screen.getByText('Title text')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<CardTitle data-testid="title">Title</CardTitle>)
      const title = screen.getByTestId('title')
      expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight')
    })

    it('should merge custom className', () => {
      render(
        <CardTitle className="custom-title" data-testid="title">
          Title
        </CardTitle>
      )
      expect(screen.getByTestId('title')).toHaveClass('custom-title', 'text-2xl')
    })
  })

  describe('CardDescription', () => {
    it('should render with children', () => {
      render(<CardDescription>Description text</CardDescription>)
      expect(screen.getByText('Description text')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<CardDescription data-testid="description">Description</CardDescription>)
      const description = screen.getByTestId('description')
      expect(description).toHaveClass('text-sm', 'text-muted-foreground')
    })

    it('should merge custom className', () => {
      render(
        <CardDescription className="custom-desc" data-testid="description">
          Description
        </CardDescription>
      )
      expect(screen.getByTestId('description')).toHaveClass('custom-desc', 'text-sm')
    })
  })

  describe('CardContent', () => {
    it('should render with children', () => {
      render(<CardContent>Content text</CardContent>)
      expect(screen.getByText('Content text')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<CardContent data-testid="content">Content</CardContent>)
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('p-6', 'pt-0')
    })

    it('should merge custom className', () => {
      render(
        <CardContent className="custom-content" data-testid="content">
          Content
        </CardContent>
      )
      expect(screen.getByTestId('content')).toHaveClass('custom-content', 'p-6')
    })
  })

  describe('CardFooter', () => {
    it('should render with children', () => {
      render(<CardFooter>Footer content</CardFooter>)
      expect(screen.getByText('Footer content')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>)
      const footer = screen.getByTestId('footer')
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0')
    })

    it('should merge custom className', () => {
      render(
        <CardFooter className="custom-footer" data-testid="footer">
          Footer
        </CardFooter>
      )
      expect(screen.getByTestId('footer')).toHaveClass('custom-footer', 'p-6')
    })
  })

  describe('Complete Card composition', () => {
    it('should render a complete card with all parts', () => {
      render(
        <Card data-testid="full-card">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>Card Content</CardContent>
          <CardFooter>Card Footer</CardFooter>
        </Card>
      )

      expect(screen.getByTestId('full-card')).toBeInTheDocument()
      expect(screen.getByText('Card Title')).toBeInTheDocument()
      expect(screen.getByText('Card Description')).toBeInTheDocument()
      expect(screen.getByText('Card Content')).toBeInTheDocument()
      expect(screen.getByText('Card Footer')).toBeInTheDocument()
    })

    it('should work with minimal composition', () => {
      render(
        <Card>
          <CardContent>Just content</CardContent>
        </Card>
      )

      expect(screen.getByText('Just content')).toBeInTheDocument()
    })

    it('should support nested HTML elements', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>
              <span>Nested Title</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Paragraph in content</p>
            <button>Action</button>
          </CardContent>
        </Card>
      )

      expect(screen.getByText('Nested Title')).toBeInTheDocument()
      expect(screen.getByText('Paragraph in content')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
    })
  })
})
