import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { userEvent } from '@testing-library/user-event'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

describe('Tabs', () => {
  describe('Rendering', () => {
    it('should render tabs with triggers and content', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )

      expect(screen.getByText('Tab 1')).toBeInTheDocument()
      expect(screen.getByText('Tab 2')).toBeInTheDocument()
      expect(screen.getByText('Content 1')).toBeInTheDocument()
    })

    it('should show default tab content', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Default Content</TabsContent>
        </Tabs>
      )

      expect(screen.getByText('Default Content')).toBeVisible()
    })
  })

  describe('TabsList', () => {
    it('should apply default classes', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList data-testid="tabs-list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      )

      const tabsList = screen.getByTestId('tabs-list')
      expect(tabsList).toHaveClass('inline-flex', 'items-center', 'justify-center', 'rounded-md', 'bg-muted')
    })

    it('should merge custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList className="custom-list" data-testid="tabs-list">
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      )

      expect(screen.getByTestId('tabs-list')).toHaveClass('custom-list', 'inline-flex')
    })
  })

  describe('TabsTrigger', () => {
    it('should render trigger button', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" data-testid="trigger">
              Tab 1
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )

      expect(screen.getByTestId('trigger')).toBeInTheDocument()
    })

    it('should apply default classes', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" data-testid="trigger">
              Tab 1
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )

      const trigger = screen.getByTestId('trigger')
      expect(trigger).toHaveClass('inline-flex', 'items-center', 'justify-center', 'rounded-sm')
    })

    it('should merge custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" className="custom-trigger" data-testid="trigger">
              Tab 1
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )

      expect(screen.getByTestId('trigger')).toHaveClass('custom-trigger', 'inline-flex')
    })

    it('should be disabled when disabled prop is true', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" disabled data-testid="trigger">
              Disabled Tab
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )

      expect(screen.getByTestId('trigger')).toBeDisabled()
    })
  })

  describe('TabsContent', () => {
    it('should render content for active tab', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" data-testid="content">
            Active Content
          </TabsContent>
        </Tabs>
      )

      expect(screen.getByTestId('content')).toBeInTheDocument()
      expect(screen.getByText('Active Content')).toBeVisible()
    })

    it('should apply default classes', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" data-testid="content">
            Content
          </TabsContent>
        </Tabs>
      )

      expect(screen.getByTestId('content')).toHaveClass('mt-2', 'ring-offset-background')
    })

    it('should merge custom className', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="custom-content" data-testid="content">
            Content
          </TabsContent>
        </Tabs>
      )

      expect(screen.getByTestId('content')).toHaveClass('custom-content', 'mt-2')
    })
  })

  describe('Interaction', () => {
    it('should switch tabs on click', async () => {
      const user = userEvent.setup()
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )

      expect(screen.getByText('Content 1')).toBeVisible()

      await user.click(screen.getByText('Tab 2'))
      expect(screen.getByText('Content 2')).toBeVisible()
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )

      const tab1 = screen.getByText('Tab 1')
      tab1.focus()
      expect(tab1).toHaveFocus()

      await user.keyboard('{ArrowRight}')
      expect(screen.getByText('Tab 2')).toHaveFocus()
    })
  })

  describe('Controlled State', () => {
    it('should support controlled value', () => {
      const { rerender } = render(
        <Tabs value="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )

      expect(screen.getByText('Content 1')).toBeVisible()

      rerender(
        <Tabs value="tab2">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
        </Tabs>
      )

      expect(screen.getByText('Content 2')).toBeVisible()
    })
  })

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
        </Tabs>
      )

      expect(screen.getByRole('tablist')).toBeInTheDocument()
      expect(screen.getAllByRole('tab')).toHaveLength(2)
    })

    it('should indicate active tab with aria-selected', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" data-testid="tab1">
              Tab 1
            </TabsTrigger>
            <TabsTrigger value="tab2" data-testid="tab2">
              Tab 2
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )

      expect(screen.getByTestId('tab1')).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByTestId('tab2')).toHaveAttribute('aria-selected', 'false')
    })
  })

  describe('Multiple Tabs', () => {
    it('should render many tabs', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            <TabsTrigger value="tab4">Tab 4</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content 1</TabsContent>
          <TabsContent value="tab2">Content 2</TabsContent>
          <TabsContent value="tab3">Content 3</TabsContent>
          <TabsContent value="tab4">Content 4</TabsContent>
        </Tabs>
      )

      expect(screen.getAllByRole('tab')).toHaveLength(4)
    })
  })
})
