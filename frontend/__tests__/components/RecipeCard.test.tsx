import { render, screen } from '@testing-library/react'
import RecipeCard from '@/components/RecipeCard'
import { Recipe } from '@/lib/api'

describe('RecipeCard', () => {
  const mockRecipe: Recipe = {
    id: 1,
    title: 'Test Recipe',
    description: 'A test recipe description',
    instructions: 'Test instructions',
    prep_time: 10,
    cook_time: 20,
    servings: 4,
    ingredients: [],
    created_at: '2024-01-01T00:00:00Z',
  }

  it('renders recipe information', () => {
    render(<RecipeCard recipe={mockRecipe} />)

    expect(screen.getByText('Test Recipe')).toBeInTheDocument()
    expect(screen.getByText('A test recipe description')).toBeInTheDocument()
    expect(screen.getByText('30 min')).toBeInTheDocument()
    expect(screen.getByText('Serves 4')).toBeInTheDocument()
  })

  it('renders with category', () => {
    const recipeWithCategory = {
      ...mockRecipe,
      category: { id: 1, name: 'Dessert', description: 'Sweet treats' },
    }

    render(<RecipeCard recipe={recipeWithCategory} />)
    expect(screen.getByText('Dessert')).toBeInTheDocument()
  })

  it('links to recipe detail page', () => {
    render(<RecipeCard recipe={mockRecipe} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/recipes/1')
  })

  it('applies blue-toned color scheme', () => {
    const recipeWithCategory = {
      ...mockRecipe,
      category: { id: 1, name: 'Dessert', description: 'Sweet treats' },
    }

    const { container } = render(<RecipeCard recipe={recipeWithCategory} />)

    const card = container.querySelector('div[class*="border-primary-200"]')
    expect(card).toBeInTheDocument()

    const categoryBadge = screen.getByText('Dessert')
    expect(categoryBadge).toHaveClass('bg-accent-100')
    expect(categoryBadge).toHaveClass('text-accent-800')
  })
})
