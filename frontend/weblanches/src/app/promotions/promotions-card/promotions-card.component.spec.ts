import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionsCardComponent } from './promotions-card.component';

describe('PromotionsCardComponent', () => {
  let component: PromotionsCardComponent;
  let fixture: ComponentFixture<PromotionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
