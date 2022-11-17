import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadableWidgetComponent } from './loadable-widget.component';

describe('LoadableWidgetComponent', () => {
  let component: LoadableWidgetComponent;
  let fixture: ComponentFixture<LoadableWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadableWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadableWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
