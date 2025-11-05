import { render, screen } from '@testing-library/react'
import Navbar from '@/components/Navbar'

describe('Navbar', () => {
  it('renders the navbar with correct links', () => {
    render(<Navbar />)

    expect(screen.getByText('Recipe Manager')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('All Recipes')).toBeInTheDocument()
    expect(screen.getByText('Create Recipe')).toBeInTheDocument()
  })

  it('has correct href attributes', () => {
    render(<Navbar />)

    const homeLink = screen.getByText('Home').closest('a')
    const recipesLink = screen.getByText('All Recipes').closest('a')
    const createLink = screen.getByText('Create Recipe').closest('a')

    expect(homeLink).toHaveAttribute('href', '/')
    expect(recipesLink).toHaveAttribute('href', '/recipes')
    expect(createLink).toHaveAttribute('href', '/recipes/new')
  })

  it('applies blue-toned color scheme', () => {
    const { container } = render(<Navbar />)

    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('bg-primary-600')

    const brandLink = screen.getByText('Recipe Manager')
    expect(brandLink).toHaveClass('hover:text-primary-100')

    const homeLink = screen.getByText('Home')
    expect(homeLink).toHaveClass('hover:bg-primary-700')
  })
})
