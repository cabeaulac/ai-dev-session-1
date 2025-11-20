import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/contexts/ThemeContext'

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Helper to wrap with ThemeProvider
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

describe('Navbar', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('light', 'dark')
  })

  it('renders the navbar with correct links', () => {
    renderWithTheme(<Navbar />)

    expect(screen.getByText('Recipe Manager')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('All Recipes')).toBeInTheDocument()
    expect(screen.getByText('Create Recipe')).toBeInTheDocument()
  })

  it('has correct href attributes', () => {
    renderWithTheme(<Navbar />)

    const homeLink = screen.getByText('Home').closest('a')
    const recipesLink = screen.getByText('All Recipes').closest('a')
    const createLink = screen.getByText('Create Recipe').closest('a')

    expect(homeLink).toHaveAttribute('href', '/')
    expect(recipesLink).toHaveAttribute('href', '/recipes')
    expect(createLink).toHaveAttribute('href', '/recipes/new')
  })

  it('includes the theme toggle button', () => {
    renderWithTheme(<Navbar />)

    const themeToggle = screen.getByRole('button', { name: /switch to/i })
    expect(themeToggle).toBeInTheDocument()
  })
})
