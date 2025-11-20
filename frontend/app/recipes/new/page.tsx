"use client";

import RecipeForm from "@/components/RecipeForm";
import { createRecipe, RecipeCreate } from "@/lib/api";

export default function NewRecipePage() {
  const handleSubmit = async (data: RecipeCreate) => {
    await createRecipe(data);
  };

  return (
    <main className="min-h-screen p-8 bg-gray-100 dark:bg-slate-900 transition-colors">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Create New Recipe
        </h1>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-lg shadow-md transition-colors">
          <RecipeForm onSubmit={handleSubmit} submitLabel="Create Recipe" />
        </div>
      </div>
    </main>
  );
}
