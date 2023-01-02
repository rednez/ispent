import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateCurrencyComponent } from './dialog-create-currency.component';

describe('DialogCreateCurrencyComponent', () => {
  let component: DialogCreateCurrencyComponent;
  let fixture: ComponentFixture<DialogCreateCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCreateCurrencyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogCreateCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
