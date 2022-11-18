import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthDatePickerComponent } from './month-date-picker.component';

describe('MonthDatePickerComponent', () => {
  let component: MonthDatePickerComponent;
  let fixture: ComponentFixture<MonthDatePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MonthDatePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
