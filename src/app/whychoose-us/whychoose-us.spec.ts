import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhychooseUs } from './whychoose-us';

describe('WhychooseUs', () => {
  let component: WhychooseUs;
  let fixture: ComponentFixture<WhychooseUs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhychooseUs],
    }).compileComponents();

    fixture = TestBed.createComponent(WhychooseUs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
