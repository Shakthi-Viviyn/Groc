from pydantic import BaseModel

class Product(BaseModel):
    name: str

class CategorizedProduct(BaseModel):
    name: str
    category: str
    similarity: float