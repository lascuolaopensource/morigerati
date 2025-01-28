interface xButtonProps {
  isOpen: boolean
  onClick: () => void
}

export const XButton = ({ isOpen, onClick }: xButtonProps) => (
  <button
    className="w-8 pb-1 flex items-center justify-center z-50"
    onClick={onClick}
    aria-expanded={isOpen}
    aria-controls="nav-menu"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
  >
    <div className="relative w-6 h-6">
      <div
        className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-black transform -translate-x-1/2 transition-transform duration-300 ${
          isOpen ? 'rotate-45' : '-translate-y-1'
        }`}
      />
      <div
        className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-black transform -translate-x-1/2 transition-opacity duration-300 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div
        className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-black transform -translate-x-1/2 transition-transform duration-300 ${
          isOpen ? '-rotate-45' : 'translate-y-1'
        }`}
      />
    </div>
  </button>
)
