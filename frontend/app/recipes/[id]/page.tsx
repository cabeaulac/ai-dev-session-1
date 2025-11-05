"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getRecipe, deleteRecipe, Recipe } from "@/lib/api";
import Link from "next/link";

export default function RecipeDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

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

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this recipe?")) {
      return;
    }

    setDeleting(true);
    try {
      await deleteRecipe(id);
      router.push("/recipes");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete recipe");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
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
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || "Recipe not found"}
          </div>
        </div>
      </main>
    );
  }

  const totalTime = (recipe.prep_time || 0) + (recipe.cook_time || 0);

  return (
    <main className="min-h-screen p-8 bg-primary-50 dark:bg-primary-900">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-primary-800 rounded-lg shadow-md p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {recipe.title}
            </h1>
            <div className="flex gap-2">
              <Link
                href={`/recipes/${recipe.id}/edit`}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>

          {recipe.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              {recipe.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 mb-8 text-sm">
            {recipe.category && (
              <div className="bg-accent-100 dark:bg-accent-800 text-accent-800 dark:text-accent-100 px-4 py-2 rounded-lg">
                {recipe.category.name}
              </div>
            )}
            {recipe.prep_time && (
              <div className="bg-primary-50 dark:bg-primary-700 px-4 py-2 rounded-lg">
                Prep: {recipe.prep_time} min
              </div>
            )}
            {recipe.cook_time && (
              <div className="bg-primary-50 dark:bg-primary-700 px-4 py-2 rounded-lg">
                Cook: {recipe.cook_time} min
              </div>
            )}
            {totalTime > 0 && (
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg font-semibold">
                Total: {totalTime} min
              </div>
            )}
            {recipe.servings && (
              <div className="bg-primary-50 dark:bg-primary-700 px-4 py-2 rounded-lg">
                Serves: {recipe.servings}
              </div>
            )}
          </div>

          {recipe.ingredients.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient) => (
                  <li
                    key={ingredient.id}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    <span>
                      {ingredient.amount && ingredient.unit
                        ? `${ingredient.amount} ${ingredient.unit} `
                        : ingredient.amount
                        ? `${ingredient.amount} `
                        : ""}
                      {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Instructions
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                {recipe.instructions}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/recipes"
            className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300"
          >
            ← Back to all recipes
          </Link>
        </div>
      </div>
    </main>
  );
}
