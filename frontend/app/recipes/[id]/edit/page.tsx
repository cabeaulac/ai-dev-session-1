"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RecipeForm from "@/components/RecipeForm";
import { getRecipe, updateRecipe, RecipeCreate, Recipe } from "@/lib/api";

export default function EditRecipePage() {
  const params = useParams();
  const id = parseInt(params.id as string);

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const data = await getRecipe(id);
      setRecipe(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load recipe");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: RecipeCreate) => {
    await updateRecipe(id, data);
  };

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center text-gray-600 dark:text-gray-400">
            Loading recipe...
          </div>
        </div>
      </main>
    );
  }

  if (error || !recipe) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || "Recipe not found"}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-primary-50 dark:bg-primary-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Edit Recipe
        </h1>
        <div className="bg-white dark:bg-primary-800 p-8 rounded-lg shadow-md">
          <RecipeForm
            initialData={{
              title: recipe.title,
              description: recipe.description,
              instructions: recipe.instructions,
              prep_time: recipe.prep_time,
              cook_time: recipe.cook_time,
              servings: recipe.servings,
              category_id: recipe.category_id,
              ingredients: recipe.ingredients,
            }}
            onSubmit={handleSubmit}
            submitLabel="Update Recipe"
          />
        </div>
      </div>
    </main>
  );
}
