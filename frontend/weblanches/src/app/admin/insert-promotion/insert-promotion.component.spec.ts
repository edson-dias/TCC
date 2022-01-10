import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionInsertComponent } from './insert-promotion.component';

describe('PromotionInsertComponent', () => {
  let component: PromotionInsertComponent;
  let fixture: ComponentFixture<PromotionInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
