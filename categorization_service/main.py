from typing import List
from fastapi import FastAPI
from data import grocery_categories

import spacy
import numpy as np
from models import Product, CategorizedProduct

app = FastAPI()
nlp = spacy.load("en_core_web_md")

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
