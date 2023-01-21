import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResultNotificationComponent } from './request-result-notification.component';

describe('RequestResultNotificationComponent', () => {
  let component: RequestResultNotificationComponent;
  let fixture: ComponentFixture<RequestResultNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestResultNotificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestResultNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
