import Link from "next/link";
import { Recipe } from "@/lib/api";

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const totalTime =
    (recipe.prep_time || 0) + (recipe.cook_time || 0);

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="border border-primary-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer bg-white dark:bg-primary-900 dark:border-primary-700">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {recipe.title}
        </h3>
        {recipe.description && (
          <p className="text-gray-600 dark:text-primary-100 mb-3 line-clamp-2">
            {recipe.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
          {recipe.category && (
            <span className="bg-accent-100 dark:bg-accent-800 text-accent-800 dark:text-accent-100 px-2 py-1 rounded">
              {recipe.category.name}
            </span>
          )}
          {totalTime > 0 && (
            <span className="bg-primary-50 dark:bg-primary-800 text-primary-700 dark:text-primary-200 px-2 py-1 rounded">
              {totalTime} min
            </span>
          )}
          {recipe.servings && (
            <span className="bg-primary-50 dark:bg-primary-800 text-primary-700 dark:text-primary-200 px-2 py-1 rounded">
              Serves {recipe.servings}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
