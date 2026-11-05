import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-food-categories',
  imports: [],
  templateUrl: './food-categories.html',
  styleUrl: './food-categories.scss',
})
export class FoodCategories {
@Input() imageUrl: string = '';
@Input() text: string = '';
}
