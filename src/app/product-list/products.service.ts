import { Injectable } from "@angular/core";
import { Product } from "../product-list/product/product.entity";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class ProductService {
    productListChanged = new Subject<Product[]>()
    productList: Product[] = [
        {
            id: 1,
            name: `Bułki`,
            count: 1,
            addedToShoppingList: 0
        },
        {
            id: 2,
            name: `Masło`,
            count: 1,
            addedToShoppingList: 0
        },
        {
            id: 3,
            name: `Piersi z kurczaka`,
            count: 1,
            addedToShoppingList: 0
        }
    ]

    constructor(private readonly shoppingListService: ShoppingListService) {}

    getProducts() {
        return this.productList
    }

    addProduct(productName: string) {
        const productExist = this.productList.find(product => product.name.toUpperCase() === productName.toUpperCase())
         
        if(!productExist) {
            const newProduct: Product = {
                id: this.productList.length + 1,
                name: productName,
                count: 1,
                addedToShoppingList: 0
            }
            this.productList.push(newProduct)
            this.productListChanged.next(this.productList.slice())
            return newProduct;
        } else {
            return productExist
        }
    }

    removeProduct(index: number) {
        this.productList = this.productList.filter(product => product.id !== index)
        this.shoppingListService.removeProduct(index)
        this.productListChanged.next(this.productList.slice())
    }

    updateAddedToShoppingList(product: Product) {
        const index = this.productList.findIndex(el => el.id === product.id)
        this.productList[index].addedToShoppingList = this.productList[index].addedToShoppingList! + 1        
    }
}