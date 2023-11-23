import { Product } from "src/app/product-list/product/product.entity"

export interface Meal {
    id: number,
    name: string,
    description: string,
    ingredients: Product[]
}

export interface CreateMeal {
    name: string,
    description: string,
    ingredients: Product[]
}