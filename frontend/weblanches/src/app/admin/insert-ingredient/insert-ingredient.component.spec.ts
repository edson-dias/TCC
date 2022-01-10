import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientInsertComponent } from './insert-ingredient.component';

describe('IngredientInsertComponent', () => {
  let component: IngredientInsertComponent;
  let fixture: ComponentFixture<IngredientInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
