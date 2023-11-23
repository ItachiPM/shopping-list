import { RouterModule, Routes } from '@angular/router';

import { EditMealComponent } from './meal-list/edit-meal/edit-meal.component';
import {MealListComponent} from "./meal-list/meal-list.component";
import { NgModule } from '@angular/core';
import {ProductListComponent} from "./product-list/product-list.component";
import {ShoppingListServiceComponent} from "./shopping-list/shopping-list.component";

const routes: Routes = [
  {
    path: ``,
    redirectTo: `/shopping-list`,
    pathMatch: `full`
  },
  {
    path: `shopping-list`,
    component: ShoppingListServiceComponent
  },
  {
    path: `product-list`,
    component: ProductListComponent
  },
  {
    path: `meal-list`,
    component: MealListComponent,
    pathMatch: `full`
  },
  {
    path: `meal-list/edit`,
    component: EditMealComponent,
  },
  {
    path: `meal-list/edit/:id`,
    component: EditMealComponent,
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
