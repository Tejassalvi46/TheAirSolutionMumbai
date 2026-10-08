import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandProduct } from './brand-product';

describe('BrandProduct', () => {
  let component: BrandProduct;
  let fixture: ComponentFixture<BrandProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandProduct],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandProduct);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
