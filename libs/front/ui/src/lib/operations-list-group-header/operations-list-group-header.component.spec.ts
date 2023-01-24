import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsListGroupHeaderComponent } from './operations-list-group-header.component';

describe('OperationsListGroupHeaderComponent', () => {
  let component: OperationsListGroupHeaderComponent;
  let fixture: ComponentFixture<OperationsListGroupHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationsListGroupHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationsListGroupHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
