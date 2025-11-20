const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Ingredient {
  id?: number;
  name: string;
  amount?: number;
  unit?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Recipe {
  id: number;
  title: string;
  description?: string;
  instructions: string;
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  category_id?: number;
  category?: Category;
  ingredients: Ingredient[];
  created_at: string;
  updated_at?: string;
}

export interface RecipeCreate {
  title: string;
  description?: string;
  instructions: string;
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  category_id?: number;
  ingredients: Ingredient[];
}

// Recipe API functions
export async function getRecipes(
  categoryId?: number,
  search?: string
): Promise<Recipe[]> {
  const params = new URLSearchParams();
  if (categoryId) params.append("category_id", categoryId.toString());
  if (search) params.append("search", search);

  const url = `${API_URL}/api/recipes/${params.toString() ? `?${params}` : ""}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return response.json();
}

export async function getRecipe(id: number): Promise<Recipe> {
  const response = await fetch(`${API_URL}/api/recipes/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  return response.json();
}

export async function createRecipe(recipe: RecipeCreate): Promise<Recipe> {
  const response = await fetch(`${API_URL}/api/recipes/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error("Failed to create recipe");
  }

  return response.json();
}

export async function updateRecipe(
  id: number,
  recipe: Partial<RecipeCreate>
): Promise<Recipe> {
  const response = await fetch(`${API_URL}/api/recipes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error("Failed to update recipe");
  }

  return response.json();
}

export async function deleteRecipe(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/api/recipes/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete recipe");
  }
}

// Category API functions
export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/api/categories/`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function createCategory(
  name: string,
  description?: string
): Promise<Category> {
  const response = await fetch(`${API_URL}/api/categories/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
  });

  if (!response.ok) {
    throw new Error("Failed to create category");
  }

  return response.json();
}
