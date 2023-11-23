import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { MealListService } from '../meal-list.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { CreateMeal, Meal } from '../meal/meal.entity';

@Component({
  selector: 'app-edit-meal',
  templateUrl: './edit-meal.component.html',
  styleUrls: ['./edit-meal.component.css']
})
export class EditMealComponent implements OnInit {

  editMode: boolean = false
  id: number
  mealFormGroup = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null),
    ingredients: new FormArray<FormGroup>([
      new FormGroup({
        name: new FormControl<string | null>(null, Validators.required),
        count: new FormControl<number>(0, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      }),
    ])
  })

  get controls() {
    return (<FormArray>this.mealFormGroup.get('ingredients')).controls;
  }

  constructor(private readonly mealListService: MealListService, private readonly router: Router, private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if(params[`id`]) {
        this.id = +params[`id`]
        this.editMode = true
      }
    })
    this.initForm()
  }

  initForm() {
    const meal = this.mealListService.getMeal(this.id)

    let name = null;
    let description = null;
    const ingredients = new FormArray<FormGroup>([])

    if(meal) {
      name = meal.name;
      description = meal.description;
      for(const ingredient of meal.ingredients) {
        ingredients.push(new FormGroup({
          name: new FormControl(ingredient.name, Validators.required),
          count: new FormControl(ingredient.count, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }))
      }
    }

    this.mealFormGroup = new FormGroup({
      name: new FormControl<string | null>(name, Validators.required),
      description: new FormControl<string | null>(description),
      ingredients
    })
  }

  onAddIngredient() {
    (<FormArray>this.mealFormGroup.get(`ingredients`)).push(new FormGroup({
      name: new FormControl<string | null>(null, Validators.required),
      count: new FormControl<number>(0, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onRemoveIngredient(index: number) {
    (<FormArray>this.mealFormGroup.get(`ingredients`)).removeAt(index)
  }

  onSubmit() {
    const {name, description, ingredients} = this.mealFormGroup.value

    if(!name || !ingredients) {
      return
    }

    if(this.editMode) {
      const updateMeal: Meal = {
        id: this.id,
        description: description! === null ? `` : description!,
        name,
        ingredients
      }

      this.mealListService.updateMeal(updateMeal)
      this.router.navigate(['../../'], {relativeTo: this.route})
    } else {
      const newMeal: CreateMeal = {
        name,
        description: description! === null ? `` : description!,
        ingredients
      }
      
      this.mealListService.addMeal(newMeal)
      this.router.navigate(['../'], {relativeTo: this.route})
    }
  }
}
