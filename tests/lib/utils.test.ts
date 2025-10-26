import { describe, it, expect } from 'vitest'
import { cn, formatDate, truncate } from '@/lib/utils'

describe('lib/utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('should handle undefined and null values', () => {
      expect(cn('foo', undefined, 'bar', null, 'baz')).toBe('foo bar baz')
    })

    it('should handle conditional classes', () => {
      expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
      expect(cn('foo', true && 'bar')).toBe('foo bar')
    })

    it('should merge tailwind classes with proper precedence', () => {
      // Later classes should override earlier ones
      expect(cn('px-2', 'px-4')).toBe('px-4')
      expect(cn('text-sm', 'text-lg')).toBe('text-lg')
    })

    it('should handle array of classes', () => {
      expect(cn(['foo', 'bar'])).toBe('foo bar')
    })

    it('should handle object notation', () => {
      expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz')
    })

    it('should handle complex mixed inputs', () => {
      expect(
        cn('base-class', { active: true, disabled: false }, ['extra', 'classes'], 'final')
      ).toBe('base-class active extra classes final')
    })
  })

  describe('formatDate', () => {
    it('should format Date object correctly', () => {
      const date = new Date('2024-10-26T12:00:00.000Z')
      const formatted = formatDate(date)

      expect(formatted).toContain('October')
      expect(formatted).toContain('26')
      expect(formatted).toContain('2024')
    })

    it('should format date string correctly', () => {
      const formatted = formatDate('2024-10-26')

      expect(formatted).toContain('October')
      expect(formatted).toContain('26')
      expect(formatted).toContain('2024')
    })

    it('should handle different date formats', () => {
      const date1 = formatDate('2024-01-01')
      const date2 = formatDate('2024-12-31')

      expect(date1).toContain('January')
      expect(date2).toContain('December')
    })
  })

  describe('truncate', () => {
    it('should truncate long text with ellipsis', () => {
      expect(truncate('Hello World', 5)).toBe('Hello...')
    })

    it('should not truncate short text', () => {
      expect(truncate('Hi', 10)).toBe('Hi')
    })

    it('should handle exact length', () => {
      expect(truncate('Hello', 5)).toBe('Hello')
    })

    it('should handle empty string', () => {
      expect(truncate('', 5)).toBe('')
    })

    it('should handle zero max length', () => {
      expect(truncate('Hello', 0)).toBe('...')
    })

    it('should truncate long text correctly', () => {
      const longText = 'This is a very long text that should be truncated'
      expect(truncate(longText, 20)).toBe('This is a very long ...')
    })
  })
})
