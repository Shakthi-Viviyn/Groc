from typing import List
from fastapi import FastAPI

import spacy
import numpy as np
from models import Product, CategorizedProduct

app = FastAPI()
nlp = spacy.load("en_core_web_md")


grocery_categories = {
    "Fresh Produce": [
        "Apples", "Bananas", "Oranges", "Strawberries", "Blueberries", "Grapes", "Watermelon", "Lettuce", "Spinach", "Kale",
        "Tomatoes", "Cucumbers", "Broccoli", "Carrots", "Potatoes", "Onions", "Garlic", "Bell Peppers", "Avocado", "Mango"
    ],
    "Dairy & Eggs": [
        "Milk", "Yogurt", "Cheese", "Butter", "Eggs", "Sour Cream", "Cottage Cheese", "Cream Cheese", "Ice Cream", "Whipped Cream",
        "Mozzarella", "Cheddar", "Parmesan", "Feta", "Goat Cheese", "Almond Milk", "Soy Milk", "Oat Milk", "Coconut Milk", "Yogurt Drink"
    ],
    "Meat & Seafood": [
        "Beef", "Chicken", "Pork", "Turkey", "Lamb", "Salmon", "Tuna", "Shrimp", "Cod", "Tilapia",
        "Bacon", "Sausage", "Hot Dogs", "Deli Meat", "Ground Beef", "Steak", "Roast", "Chicken Breast", "Pork Chops", "Shrimp Scampi"
    ],
    "Bakery & Grains": [
        "Bread", "Rolls", "Bagels", "Croissants", "Muffins", "Cookies", "Cake", "Pie", "Pasta", "Rice",
        "Oatmeal", "Cereal", "Flour", "Sugar", "Brown Rice", "Quinoa", "Whole Wheat Bread", "Sourdough", "Rye Bread", "Pita Bread"
    ],
    "Pantry Staples": [
        "Canned Tomatoes", "Canned Beans", "Canned Corn", "Pasta Sauce", "Olive Oil", "Vegetable Oil", "Salt", "Pepper", "Sugar", "Flour",
        "Rice", "Oatmeal", "Coffee", "Tea", "Spices", "Herbs", "Vinegar", "Soy Sauce", "Honey", "Jam"
    ],
    "Snacks & Beverages": [
        "Chips", "Crackers", "Cookies", "Candy", "Chocolate", "Soda", "Juice", "Water", "Coffee", "Tea",
        "Pretzels", "Popcorn", "Granola Bars", "Energy Drinks", "Sports Drinks", "Iced Tea", "Lemonade", "Smoothies", "Protein Bars", "Trail Mix"
    ],
    "Frozen Foods": [
        "Frozen Peas", "Frozen Corn", "Frozen Broccoli", "Frozen Strawberries", "Frozen Blueberries", "Frozen Mango", "Frozen Pizza", "Frozen Meals", "Frozen Desserts", "Ice Cream",
        "Frozen Waffles", "Frozen Pancakes", "Frozen French Fries", "Frozen Chicken Nuggets", "Frozen Fish Sticks", "Frozen Yogurt", "Frozen Smoothies", "Frozen Fruit Mix", "Frozen Vegetable Mix", "Frozen Pasta Dishes"
    ],
    "Other": [
        "Laundry Detergent", "Dish Soap", "Paper Towels", "Toilet Paper", "Cleaning Supplies", "Shampoo", "Conditioner", "Toothpaste", "Soap", "Deodorant", "Cups", "Plates", "Napkins"
        "Batteries", "Light Bulbs", "Trash Bags", "Plastic Wrap", "Aluminum Foil", "Household Cleaners", "Pet Food", "Greeting Cards", "Gift Wrap", "Office Supplies"
    ]
}

category_centroids = {}

def init():
    for category in grocery_categories:
        products = grocery_categories[category]
        embeddings = [nlp(product).vector for product in products]
        centroid = np.mean(embeddings, axis=0)
        category_centroids[category] = centroid
    print("----Computed centroids-----")

init()

@app.post("/categorize/")
async def categorize(products: List[Product]) -> List[CategorizedProduct]:

    response = []
    for product in products:

        label_vec = nlp(product.name).vector

        best_category = None
        best_similarity = -1
        for category, centroid in category_centroids.items():
            similarity = sum(label_vec * centroid) / (
                (sum(label_vec**2)**0.5) * (sum(centroid**2)**0.5)
            )
            if similarity > best_similarity:
                best_similarity = similarity
                best_category = category
        
        response.append({"name": product.name, "category": best_category, "similarity": float(best_similarity)})
    
    return response
