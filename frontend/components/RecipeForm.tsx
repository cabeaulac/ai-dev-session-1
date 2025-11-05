"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RecipeCreate, Category, Ingredient, getCategories } from "@/lib/api";

interface RecipeFormProps {
  initialData?: Partial<RecipeCreate>;
  onSubmit: (data: RecipeCreate) => Promise<void>;
  submitLabel?: string;
}

export default function RecipeForm({
  initialData,
  onSubmit,
  submitLabel = "Create Recipe",
}: RecipeFormProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<RecipeCreate>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    instructions: initialData?.instructions || "",
    prep_time: initialData?.prep_time || undefined,
    cook_time: initialData?.cook_time || undefined,
    servings: initialData?.servings || undefined,
    category_id: initialData?.category_id || undefined,
    ingredients: initialData?.ingredients || [],
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await onSubmit(formData);
      router.push("/recipes");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save recipe");
    } finally {
      setLoading(false);
    }
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: "", amount: 0, unit: "" }],
    });
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const removeIngredient = (index: number) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Title *</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-primary-900 dark:border-primary-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-primary-900 dark:border-primary-700"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Instructions *</label>
        <textarea
          required
          value={formData.instructions}
          onChange={(e) =>
            setFormData({ ...formData, instructions: e.target.value })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-primary-900 dark:border-primary-700"
          rows={6}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Prep Time (min)</label>
          <input
            type="number"
            value={formData.prep_time || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                prep_time: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-primary-900 dark:border-primary-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Cook Time (min)</label>
          <input
            type="number"
            value={formData.cook_time || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                cook_time: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-primary-900 dark:border-primary-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Servings</label>
          <input
            type="number"
            value={formData.servings || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                servings: e.target.value ? parseInt(e.target.value) : undefined,
              })
            }
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-primary-900 dark:border-primary-700"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          value={formData.category_id || ""}
          onChange={(e) =>
            setFormData({
              ...formData,
              category_id: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-primary-900 dark:border-primary-700"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium">Ingredients</label>
          <button
            type="button"
            onClick={addIngredient}
            className="text-primary-600 hover:text-primary-800 text-sm font-medium"
          >
            + Add Ingredient
          </button>
        </div>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Name"
              value={ingredient.name}
              onChange={(e) => updateIngredient(index, "name", e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            <input
              type="number"
              placeholder="Amount"
              value={ingredient.amount || ""}
              onChange={(e) =>
                updateIngredient(
                  index,
                  "amount",
                  e.target.value ? parseFloat(e.target.value) : 0
                )
              }
              className="w-24 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            <input
              type="text"
              placeholder="Unit"
              value={ingredient.unit || ""}
              onChange={(e) => updateIngredient(index, "unit", e.target.value)}
              className="w-24 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
            />
            <button
              type="button"
              onClick={() => removeIngredient(index)}
              className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
