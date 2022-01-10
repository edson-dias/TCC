import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchInsertComponent } from './insert-lunch.component';

describe('LunchInsertComponent', () => {
  let component: LunchInsertComponent;
  let fixture: ComponentFixture<LunchInsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LunchInsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
