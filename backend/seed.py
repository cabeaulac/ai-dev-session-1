"""
Seed script to populate the database with initial data for the Recipe Manager tutorial.
"""
from database import SessionLocal
from models import Category, Recipe, Ingredient
from datetime import datetime

def seed_database():
    db = SessionLocal()

    try:
        print("Seeding database with initial data...")

        # Create categories
        categories_data = [
            {"name": "Breakfast", "description": "Morning meals and brunch dishes"},
            {"name": "Lunch", "description": "Midday meals and light dishes"},
            {"name": "Dinner", "description": "Evening meals and hearty dishes"},
            {"name": "Desserts", "description": "Sweet treats and baked goods"},
            {"name": "Appetizers", "description": "Starters and small bites"},
            {"name": "Beverages", "description": "Drinks and cocktails"},
        ]

        # Only add categories that don't exist
        for cat_data in categories_data:
            existing = db.query(Category).filter(Category.name == cat_data["name"]).first()
            if not existing:
                category = Category(name=cat_data["name"], description=cat_data["description"])
                db.add(category)

        db.commit()
        print(f"✓ Created categories")

        # Create sample recipes (only if none exist)
        existing_recipes = db.query(Recipe).count()
        if existing_recipes > 0:
            print(f"✓ Database already has {existing_recipes} recipes. Skipping recipe creation.")
        else:
            breakfast_cat = db.query(Category).filter(Category.name == "Breakfast").first()
            dessert_cat = db.query(Category).filter(Category.name == "Desserts").first()
            dinner_cat = db.query(Category).filter(Category.name == "Dinner").first()

            recipes = [
            {
                "recipe": Recipe(
                    title="Classic Pancakes",
                    description="Fluffy buttermilk pancakes perfect for weekend breakfast",
                    instructions="1. Mix dry ingredients\n2. Whisk wet ingredients separately\n3. Combine and let rest for 5 minutes\n4. Cook on griddle until golden brown",
                    prep_time=10,
                    cook_time=15,
                    servings=4,
                    category_id=breakfast_cat.id if breakfast_cat else None
                ),
                "ingredients": [
                    Ingredient(name="All-purpose flour", amount=2, unit="cups"),
                    Ingredient(name="Sugar", amount=2, unit="tablespoons"),
                    Ingredient(name="Baking powder", amount=2, unit="teaspoons"),
                    Ingredient(name="Salt", amount=0.5, unit="teaspoon"),
                    Ingredient(name="Buttermilk", amount=2, unit="cups"),
                    Ingredient(name="Eggs", amount=2, unit="large"),
                    Ingredient(name="Butter (melted)", amount=4, unit="tablespoons"),
                ]
            },
            {
                "recipe": Recipe(
                    title="Chocolate Chip Cookies",
                    description="Classic chewy chocolate chip cookies",
                    instructions="1. Cream butter and sugars\n2. Add eggs and vanilla\n3. Mix in dry ingredients\n4. Fold in chocolate chips\n5. Bake at 375°F for 10-12 minutes",
                    prep_time=15,
                    cook_time=12,
                    servings=24,
                    category_id=dessert_cat.id if dessert_cat else None
                ),
                "ingredients": [
                    Ingredient(name="All-purpose flour", amount=2.25, unit="cups"),
                    Ingredient(name="Butter (softened)", amount=1, unit="cup"),
                    Ingredient(name="White sugar", amount=0.75, unit="cup"),
                    Ingredient(name="Brown sugar", amount=0.75, unit="cup"),
                    Ingredient(name="Eggs", amount=2, unit="large"),
                    Ingredient(name="Vanilla extract", amount=2, unit="teaspoons"),
                    Ingredient(name="Baking soda", amount=1, unit="teaspoon"),
                    Ingredient(name="Salt", amount=1, unit="teaspoon"),
                    Ingredient(name="Chocolate chips", amount=2, unit="cups"),
                ]
            },
            {
                "recipe": Recipe(
                    title="Spaghetti Carbonara",
                    description="Classic Italian pasta with eggs, cheese, and pancetta",
                    instructions="1. Cook pasta in salted water\n2. Fry pancetta until crispy\n3. Mix eggs, cheese, and pepper\n4. Toss hot pasta with pancetta\n5. Add egg mixture off heat, stirring quickly\n6. Serve immediately",
                    prep_time=10,
                    cook_time=20,
                    servings=4,
                    category_id=dinner_cat.id if dinner_cat else None
                ),
                "ingredients": [
                    Ingredient(name="Spaghetti", amount=400, unit="grams"),
                    Ingredient(name="Pancetta", amount=200, unit="grams"),
                    Ingredient(name="Eggs", amount=4, unit="large"),
                    Ingredient(name="Parmesan cheese (grated)", amount=1, unit="cup"),
                    Ingredient(name="Black pepper", amount=1, unit="teaspoon"),
                    Ingredient(name="Salt", amount=1, unit="to taste"),
                ]
            }
        ]

            for recipe_data in recipes:
                recipe = recipe_data["recipe"]
                db.add(recipe)
                db.flush()  # Get the recipe ID

                for ingredient in recipe_data["ingredients"]:
                    ingredient.recipe_id = recipe.id
                    db.add(ingredient)

            db.commit()
            print(f"✓ Created {len(recipes)} sample recipes")
        print("\nDatabase seeding completed successfully!")
        print(f"Total categories: {db.query(Category).count()}")
        print(f"Total recipes: {db.query(Recipe).count()}")

    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
