import { Injectable } from "@angular/core";
import { Product } from "../product-list/product/product.entity";
import { Subject } from "rxjs";

@Injectable()
export class ShoppingListService {
    shoppingListServiceChanged = new Subject<Product[]>()
    shoppingList: Product[] = [
        {
            id: 1,
            name: `Bułki`,
            count: 6,
        },
        {
            id: 2,
            name: `Masło`,
            count: 1,
        },
        {
            id: 3,
            name: `Piersi z kurczaka`,
            count: 2,
        }
    ]

    getShoppingList() {
        return this.shoppingList
    }

    addProduct(newProduct: Product) {
        const productAlreadyOList = this.shoppingList.find(product => product.id === newProduct.id)

        if(productAlreadyOList) {
            this.shoppingList = this.shoppingList.map(product => {
                if(product.id === newProduct.id) {
                    return {
                        ...newProduct,
                        count: product.count + newProduct.count
                    }
                }

                return product
            })            
        } else {
            this.shoppingList.push(newProduct)
        }

        this.shoppingListServiceChanged.next(this.shoppingList.slice())
    }

    removeProduct(index: number) {
        this.shoppingList = this.shoppingList.filter(product => product.id !== index)        
        this.shoppingListServiceChanged.next(this.shoppingList.slice())
    }
}