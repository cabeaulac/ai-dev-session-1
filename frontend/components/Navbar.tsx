import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-primary-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold hover:text-primary-100">
            Recipe Manager
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/"
              className="px-3 py-2 rounded-md hover:bg-primary-700 transition"
            >
              Home
            </Link>
            <Link
              href="/recipes"
              className="px-3 py-2 rounded-md hover:bg-primary-700 transition"
            >
              All Recipes
            </Link>
            <Link
              href="/recipes/new"
              className="px-3 py-2 rounded-md bg-primary-700 hover:bg-primary-800 transition"
            >
              Create Recipe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
