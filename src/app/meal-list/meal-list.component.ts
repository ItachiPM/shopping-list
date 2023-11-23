import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Meal } from './meal/meal.entity';
import { MealListService } from './meal-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.css']
})
export class MealListComponent implements OnInit {
  mealList: Meal[] = []
  subscription: Subscription

  constructor(private router: Router, private route: ActivatedRoute, private readonly mealListService: MealListService) {}

  ngOnInit() {
    this.mealList = this.mealListService.getMealList()
    this.subscription = this.mealListService.mealListChanged.subscribe( (mealList) => {
      this.mealList = mealList
    })
  }

  addNewMeal() {
    this.router.navigate([`edit`], {relativeTo: this.route})
  }
}
