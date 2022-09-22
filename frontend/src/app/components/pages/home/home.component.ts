import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodServices: FoodService, activatedRoute: ActivatedRoute) {
    let foodsObservable: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm)
        foodsObservable = this.foodServices.getAllFoodsBySearchTerm(params.searchTerm);
      else if (params.tag)
        foodsObservable = this.foodServices.getAllFoodByTag(params.tag);
      else
        foodsObservable = foodServices.getAll();

      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods
      })
    })

  }

  ngOnInit(): void {
  }

}
