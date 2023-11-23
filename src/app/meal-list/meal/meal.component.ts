import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { Meal } from './meal.entity';
import { MealListService } from '../meal-list.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css'],
  animations: [
    trigger('expandCollapseAnimation', [
      state('void', style({ height: '0', opacity: '0' })),
      state('*', style({ height: '*', opacity: '1' })),
      transition('void <=> *', animate('300ms ease-in-out'))
    ])
  ]
})
export class MealComponent {
  @Input() meal: Meal
  @Input() editable: boolean
  showIngredient = false

  constructor(private readonly mealListService: MealListService, private readonly router: Router, private readonly route: ActivatedRoute) {}
  

  onAddIngredientsToShoppingList() {
    this.mealListService.addIngredientsToShoppingList(this.meal.id)
  }

  onEditMeal() {
    this.router.navigate([`edit/${this.meal.id}`], {relativeTo: this.route})
  }

  onRemoveMeal() {
    this.mealListService.removeMeal(this.meal.id)
  }

  onShowIngredients() {
    this.showIngredient = !this.showIngredient
  }
}
