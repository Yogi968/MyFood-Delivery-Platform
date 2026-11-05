import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodCategories } from './food-categories';

describe('FoodCategories', () => {
  let component: FoodCategories;
  let fixture: ComponentFixture<FoodCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
