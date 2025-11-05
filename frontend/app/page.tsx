import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-primary-50 to-white dark:from-primary-900 dark:to-primary-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Welcome to Recipe Manager
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Your personal cookbook for organizing and sharing delicious recipes
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/recipes"
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
            >
              Browse Recipes
            </Link>
            <Link
              href="/recipes/new"
              className="px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition font-medium"
            >
              Create Recipe
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white dark:bg-primary-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Organize Your Recipes
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Keep all your favorite recipes in one place with categories and
              easy search
            </p>
          </div>
          <div className="bg-white dark:bg-primary-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Track Ingredients
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              List ingredients with amounts and units for perfect measurements
            </p>
          </div>
          <div className="bg-white dark:bg-primary-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Easy to Use
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Simple, intuitive interface makes managing recipes a breeze
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
