import { CreateMeal, Meal } from "./meal/meal.entity";

import { Injectable } from "@angular/core";
import { ProductService } from "../product-list/products.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class MealListService {
    mealListChanged = new Subject<Meal[]>()
    mealList: Meal[] = [
        {
            id: 1,
            name: `Bułki`,
            description: `domowej roboty bułki`,
            ingredients: [
                {
                    id: 1,
                    name: `Mąka`,
                    count: 1
                },
                {
                    id: 10,
                    name: `Mleko`,
                    count: 1
                },
                {   
                id: 11,
                name: `jajka`,
                count: 3
                }
            ]
        },
    ]

    constructor(private readonly shoppingListService: ShoppingListService, private readonly productService: ProductService) {}

    getMealList() {
        return this.mealList
    }

    getMeal(id: number) {
        const meal = this.mealList.find(meal => meal.id === id)

        return meal
    }

    addMeal(newMeal: CreateMeal) {
        const mealExist = this.mealList.find(meal => meal.name.toUpperCase() === newMeal.name.toUpperCase())
         
        if(!mealExist) {
            const ingredients = []
            for(const ingredient of newMeal.ingredients) {
                const product = this.productService.addProduct(ingredient.name)
                ingredients.push(product)
            }

            const meal: Meal = {
                id: this.mealList.length + 1,
                name: newMeal.name,
                description: newMeal.description,
                ingredients
            }
            this.mealList.push(meal)
            this.mealListChanged.next(this.mealList.slice())
        }
    }

    updateMeal(updateMeal: Meal) {
        this.mealList = this.mealList.map(meal => {
            if(meal.id === updateMeal.id) {
                meal = {
                    description: updateMeal.description,
                    ingredients: updateMeal.ingredients,
                    name: updateMeal.name,
                    id: meal.id,
                }
            }
            return meal;
        })
    }

    removeMeal(index: number) {
        this.mealList = this.mealList.filter(meal => meal.id !== index)
        this.shoppingListService.removeProduct(index)
        this.mealListChanged.next(this.mealList.slice())
    }

    addIngredientsToShoppingList(index: number) {
        const meal = this.mealList.find(meal => meal.id === index);
        if(!meal) {
            return;
        }

        

        for(const ingredient of meal.ingredients) {
            this.shoppingListService.addProduct(ingredient)
        }
    }
}