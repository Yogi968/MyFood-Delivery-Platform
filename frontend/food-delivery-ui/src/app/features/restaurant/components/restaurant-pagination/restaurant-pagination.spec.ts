import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantPagination } from './restaurant-pagination';

describe('RestaurantPagination', () => {
  let component: RestaurantPagination;
  let fixture: ComponentFixture<RestaurantPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantPagination]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantPagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
