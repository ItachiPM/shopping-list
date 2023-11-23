import { Component, Input, ViewChild } from '@angular/core';

import { Product } from './product.entity';
import { ProductService } from '../products.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: Product
  @Input() editable: boolean
  editMode = false

  productCount = 1

  constructor(private readonly shoppingListService: ShoppingListService, private readonly productService: ProductService) {}

  onAddProductToShoppingList() {
        
    const product: Product = {
      ...this.product,
      count: Number(this.productCount)
    }
    
    this.shoppingListService.addProduct(product)
    this.productService.updateAddedToShoppingList(product)
  }

  onRemoveProduct() {
    this.productService.removeProduct(this.product.id)
  }

  onRemoveProductFromShoppingList() {
    this.shoppingListService.removeProduct(this.product.id)
  }


}
