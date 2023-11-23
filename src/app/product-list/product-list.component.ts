import { Component, OnDestroy, OnInit } from '@angular/core';

import { Product } from './product/product.entity';
import { ProductService } from './products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  productList: Product[] = [];
  subscription: Subscription;
  newProductName = ``;
  
  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.productList = this.productService.getProducts()
    this.subscription = this.productService.productListChanged.subscribe( (productList) => {
      this.productList = productList
    })
  }

  onAddNewProduct() {
    this.productService.addProduct(this.newProductName)
    this.newProductName = ``
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
