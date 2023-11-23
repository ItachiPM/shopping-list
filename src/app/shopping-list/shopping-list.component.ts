import { Component, OnDestroy, OnInit } from '@angular/core';

import { Product } from '../product-list/product/product.entity';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListServiceComponent implements OnInit, OnDestroy {
  shoppingList: Product[] = []
  subscription: Subscription

  constructor(private readonly shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.shoppingList = this.shoppingListService.getShoppingList()
    this.subscription = this.shoppingListService.shoppingListServiceChanged.subscribe((shoppingListService) => {
      this.shoppingList = shoppingListService      
    })
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe
  }
}
