import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="bg-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold hover:text-pink-200">
            Recipe Manager
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="px-3 py-2 rounded-md hover:bg-pink-700 transition"
            >
              Home
            </Link>
            <Link
              href="/recipes"
              className="px-3 py-2 rounded-md hover:bg-pink-700 transition"
            >
              All Recipes
            </Link>
            <Link
              href="/recipes/new"
              className="px-3 py-2 rounded-md bg-pink-700 hover:bg-pink-800 transition"
            >
              Create Recipe
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
