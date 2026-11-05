import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSummaryBar } from './cart-summary-bar';

describe('CartSummaryBar', () => {
  let component: CartSummaryBar;
  let fixture: ComponentFixture<CartSummaryBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSummaryBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSummaryBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
