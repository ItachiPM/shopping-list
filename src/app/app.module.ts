import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { EditMealComponent } from './meal-list/edit-meal/edit-meal.component';
import { MealComponent } from './meal-list/meal/meal.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealListService } from './meal-list/meal-list.service';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { ProductComponent } from './product-list/product/product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product-list/products.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { ShoppingListServiceComponent } from './shopping-list/shopping-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListServiceComponent,
    ProductListComponent,
    MealListComponent,
    MealComponent,
    ProductComponent,
    MenuComponent,
    EditMealComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [ShoppingListService, ProductService, MealListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
