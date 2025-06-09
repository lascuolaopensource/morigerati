import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { bgColors } from '@/modules/utils/colors'

// Custom hook for handling theme colors based on current path
export const useThemeColors = () => {
  const pathname = usePathname()
  const path = pathname ? (pathname.split('/')[2] as keyof typeof bgColors) : 'default'
  // @ts-ignore
  const bgColor = bgColors[path] || 'bg-white'
  return bgColor
}

// Custom hook for managing menu state and side effects
export const useMenuController = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  // Handle escape key press and body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }

    // Prevent scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isMenuOpen])

  return { isMenuOpen, toggleMenu, closeMenu }
}
