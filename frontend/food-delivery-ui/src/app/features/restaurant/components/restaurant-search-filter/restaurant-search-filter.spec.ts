import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSearchFilter } from './restaurant-search-filter';

describe('RestaurantSearchFilter', () => {
  let component: RestaurantSearchFilter;
  let fixture: ComponentFixture<RestaurantSearchFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantSearchFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantSearchFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
