import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test-utils'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { userEvent } from '@testing-library/user-event'

describe('Accordion', () => {
  describe('Rendering', () => {
    it('should render accordion with items', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      expect(screen.getByText('Question 1')).toBeInTheDocument()
    })

    it('should render multiple accordion items', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Question 2</AccordionTrigger>
            <AccordionContent>Answer 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      expect(screen.getByText('Question 1')).toBeInTheDocument()
      expect(screen.getByText('Question 2')).toBeInTheDocument()
    })

    it('should render chevron icon in trigger', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      const trigger = screen.getByText('Question 1').closest('button')
      const svg = trigger?.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveClass('h-4', 'w-4')
    })
  })

  describe('AccordionItem', () => {
    it('should apply border class', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" data-testid="accordion-item">
            <AccordionTrigger>Question</AccordionTrigger>
            <AccordionContent>Answer</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      expect(screen.getByTestId('accordion-item')).toHaveClass('border-b')
    })

    it('should merge custom className', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1" className="custom-class" data-testid="accordion-item">
            <AccordionTrigger>Question</AccordionTrigger>
            <AccordionContent>Answer</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      expect(screen.getByTestId('accordion-item')).toHaveClass('custom-class', 'border-b')
    })
  })

  describe('AccordionTrigger', () => {
    it('should apply default classes', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="trigger">Question</AccordionTrigger>
            <AccordionContent>Answer</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      const trigger = screen.getByTestId('trigger')
      expect(trigger).toHaveClass('flex', 'items-center', 'justify-between', 'font-medium')
    })

    it('should have hover underline class', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger data-testid="trigger">Question</AccordionTrigger>
            <AccordionContent>Answer</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      expect(screen.getByTestId('trigger')).toHaveClass('hover:underline')
    })

    it('should merge custom className', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="custom-trigger" data-testid="trigger">
              Question
            </AccordionTrigger>
            <AccordionContent>Answer</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      expect(screen.getByTestId('trigger')).toHaveClass('custom-trigger', 'flex')
    })
  })

  describe('AccordionContent', () => {
    it('should apply animation classes', () => {
      render(
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Question</AccordionTrigger>
            <AccordionContent data-testid="content">Answer</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      const content = screen.getByTestId('content')
      expect(content).toHaveClass('overflow-hidden', 'text-sm', 'transition-all')
    })

    it('should render content text', () => {
      render(
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Question</AccordionTrigger>
            <AccordionContent>This is the answer content</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      expect(screen.getByText('This is the answer content')).toBeInTheDocument()
    })

    it('should merge custom className', () => {
      render(
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Question</AccordionTrigger>
            <AccordionContent className="custom-content" data-testid="content">
              Answer
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      const contentWrapper = screen.getByTestId('content').querySelector('div')
      expect(contentWrapper).toHaveClass('custom-content', 'pb-4')
    })
  })

  describe('Interaction', () => {
    it('should expand content when trigger is clicked', async () => {
      const user = userEvent.setup()
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const trigger = screen.getByText('Question 1')
      await user.click(trigger)

      expect(screen.getByText('Answer 1')).toBeVisible()
    })

    it('should support single type accordion', async () => {
      const user = userEvent.setup()
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question 1</AccordionTrigger>
            <AccordionContent>Answer 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Question 2</AccordionTrigger>
            <AccordionContent>Answer 2</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      await user.click(screen.getByText('Question 1'))
      expect(screen.getByText('Answer 1')).toBeVisible()

      await user.click(screen.getByText('Question 2'))
      expect(screen.getByText('Answer 2')).toBeVisible()
    })
  })

  describe('Accessibility', () => {
    it('should have proper button role for trigger', () => {
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question</AccordionTrigger>
            <AccordionContent>Answer</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      expect(screen.getByRole('button', { name: 'Question' })).toBeInTheDocument()
    })

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup()
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question</AccordionTrigger>
            <AccordionContent>Answer</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const trigger = screen.getByRole('button')
      trigger.focus()
      expect(trigger).toHaveFocus()

      await user.keyboard('{Enter}')
      expect(screen.getByText('Answer')).toBeVisible()
    })
  })

  describe('States', () => {
    it('should support defaultValue prop', () => {
      render(
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Question</AccordionTrigger>
            <AccordionContent>Answer</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
      expect(screen.getByText('Answer')).toBeVisible()
    })

    it('should support collapsible prop', async () => {
      const user = userEvent.setup()
      render(
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Question</AccordionTrigger>
            <AccordionContent>Answer</AccordionContent>
          </AccordionItem>
        </Accordion>
      )

      const trigger = screen.getByText('Question')
      await user.click(trigger)
      expect(screen.getByText('Answer')).toBeVisible()

      await user.click(trigger)
      // Content should collapse
    })
  })
})
