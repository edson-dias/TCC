import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchEditComponent } from './edit-lunch.component';

describe('LunchEditComponent', () => {
  let component: LunchEditComponent;
  let fixture: ComponentFixture<LunchEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LunchEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
