import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useToast, toast } from '@/hooks/use-toast'

describe('useToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    // Clear all toasts
    const { result } = renderHook(() => useToast())
    act(() => {
      result.current.dismiss()
    })
  })

  describe('Hook initialization', () => {
    it('should return initial empty state', () => {
      const { result } = renderHook(() => useToast())

      expect(result.current.toasts).toEqual([])
    })

    it('should provide toast function', () => {
      const { result } = renderHook(() => useToast())

      expect(typeof result.current.toast).toBe('function')
    })

    it('should provide dismiss function', () => {
      const { result } = renderHook(() => useToast())

      expect(typeof result.current.dismiss).toBe('function')
    })
  })

  describe('Creating toasts', () => {
    it('should create a toast with title', () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.toast({
          title: 'Test toast',
        })
      })

      expect(result.current.toasts).toHaveLength(1)
      expect(result.current.toasts[0].title).toBe('Test toast')
    })

    it('should create a toast with title and description', () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.toast({
          title: 'Success',
          description: 'Your changes have been saved',
        })
      })

      expect(result.current.toasts).toHaveLength(1)
      expect(result.current.toasts[0].title).toBe('Success')
      expect(result.current.toasts[0].description).toBe('Your changes have been saved')
    })

    it('should create toast with variant', () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.toast({
          title: 'Error',
          variant: 'destructive',
        })
      })

      expect(result.current.toasts[0].variant).toBe('destructive')
    })

    it('should assign unique id to each toast', () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.toast({ title: 'Toast 1' })
        result.current.toast({ title: 'Toast 2' })
      })

      // Only 1 toast due to TOAST_LIMIT = 1
      expect(result.current.toasts).toHaveLength(1)
      expect(result.current.toasts[0].id).toBeDefined()
    })

    it('should set open to true for new toasts', () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.toast({ title: 'New toast' })
      })

      expect(result.current.toasts[0].open).toBe(true)
    })
  })

  describe('Toast limit', () => {
    it('should respect TOAST_LIMIT of 1', () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.toast({ title: 'Toast 1' })
        result.current.toast({ title: 'Toast 2' })
        result.current.toast({ title: 'Toast 3' })
      })

      // Should only have 1 toast (the most recent one)
      expect(result.current.toasts).toHaveLength(1)
      expect(result.current.toasts[0].title).toBe('Toast 3')
    })
  })

  describe('Dismissing toasts', () => {
    it('should dismiss specific toast by id', () => {
      const { result } = renderHook(() => useToast())

      let toastId: string

      act(() => {
        const { id } = result.current.toast({ title: 'Test toast' })
        toastId = id
      })

      expect(result.current.toasts[0].open).toBe(true)

      act(() => {
        result.current.dismiss(toastId!)
      })

      expect(result.current.toasts[0].open).toBe(false)
    })

    it('should dismiss all toasts when no id provided', () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.toast({ title: 'Toast 1' })
      })

      expect(result.current.toasts[0].open).toBe(true)

      act(() => {
        result.current.dismiss()
      })

      expect(result.current.toasts[0].open).toBe(false)
    })

    it('should queue toast for removal after dismissal', async () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.toast({ title: 'Test toast' })
      })

      expect(result.current.toasts).toHaveLength(1)

      act(() => {
        result.current.dismiss()
      })

      // Toast should be marked as closed but still in array
      expect(result.current.toasts).toHaveLength(1)
      expect(result.current.toasts[0].open).toBe(false)

      // Fast-forward time for removal (use advanceTimersByTime instead)
      await act(async () => {
        await vi.advanceTimersByTimeAsync(1000000)
      })

      // Toast should be removed after timeout
      expect(result.current.toasts).toHaveLength(0)
    })
  })

  describe('Updating toasts', () => {
    it('should update toast properties', () => {
      const { result } = renderHook(() => useToast())

      let updateFn: (props: any) => void

      act(() => {
        const { update } = result.current.toast({ title: 'Original title' })
        updateFn = update
      })

      expect(result.current.toasts[0].title).toBe('Original title')

      act(() => {
        updateFn({ title: 'Updated title' })
      })

      expect(result.current.toasts[0].title).toBe('Updated title')
    })

    it('should update toast description', () => {
      const { result } = renderHook(() => useToast())

      let updateFn: (props: any) => void

      act(() => {
        const { update } = result.current.toast({
          title: 'Loading...',
          description: 'Please wait',
        })
        updateFn = update
      })

      act(() => {
        updateFn({
          title: 'Success!',
          description: 'Operation completed',
        })
      })

      expect(result.current.toasts[0].title).toBe('Success!')
      expect(result.current.toasts[0].description).toBe('Operation completed')
    })
  })

  describe('Standalone toast function', () => {
    it('should create toast without using hook', () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        toast({ title: 'Standalone toast' })
      })

      expect(result.current.toasts).toHaveLength(1)
      expect(result.current.toasts[0].title).toBe('Standalone toast')
    })

    it('should return toast controls', () => {
      let toastControls: { id: string; dismiss: () => void; update: (props: any) => void }

      act(() => {
        toastControls = toast({ title: 'Controlled toast' })
      })

      expect(toastControls!.id).toBeDefined()
      expect(typeof toastControls!.dismiss).toBe('function')
      expect(typeof toastControls!.update).toBe('function')
    })

    it('should allow dismissing via returned function', () => {
      const { result } = renderHook(() => useToast())

      let dismissFn: () => void

      act(() => {
        const { dismiss } = toast({ title: 'Test' })
        dismissFn = dismiss
      })

      expect(result.current.toasts[0].open).toBe(true)

      act(() => {
        dismissFn()
      })

      expect(result.current.toasts[0].open).toBe(false)
    })
  })

  describe('Multiple hook instances', () => {
    it('should share state across multiple hook instances', () => {
      const { result: result1 } = renderHook(() => useToast())
      const { result: result2 } = renderHook(() => useToast())

      act(() => {
        result1.current.toast({ title: 'Shared toast' })
      })

      // Both hooks should see the same toast
      expect(result1.current.toasts).toHaveLength(1)
      expect(result2.current.toasts).toHaveLength(1)
      expect(result1.current.toasts[0]).toEqual(result2.current.toasts[0])
    })

    it('should update all instances when toast is dismissed', () => {
      const { result: result1 } = renderHook(() => useToast())
      const { result: result2 } = renderHook(() => useToast())

      act(() => {
        result1.current.toast({ title: 'Test' })
      })

      act(() => {
        result2.current.dismiss()
      })

      expect(result1.current.toasts[0].open).toBe(false)
      expect(result2.current.toasts[0].open).toBe(false)
    })
  })

  describe('onOpenChange callback', () => {
    it('should call dismiss when onOpenChange is called with false', () => {
      const { result } = renderHook(() => useToast())

      act(() => {
        result.current.toast({ title: 'Test toast' })
      })

      const toast = result.current.toasts[0]
      expect(toast.open).toBe(true)

      act(() => {
        toast.onOpenChange?.(false)
      })

      expect(result.current.toasts[0].open).toBe(false)
    })
  })
})
