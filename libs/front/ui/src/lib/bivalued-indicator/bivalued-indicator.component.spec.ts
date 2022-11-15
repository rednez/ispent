import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiValuedIndicatorComponent } from './bivalued-indicator.component';

describe('BiValuedProgressBarComponent', () => {
  let component: BiValuedIndicatorComponent;
  let fixture: ComponentFixture<BiValuedIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BiValuedIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BiValuedIndicatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set both lines', () => {
    component.primaryAmount = 1600;
    component.secondaryAmount = 400;
    fixture.detectChanges();
    expect(component.primaryLineWidth).toBe(75);
    expect(component.secondaryLineWidth).toBe(25);
  });

  it('should set only primary line', () => {
    component.primaryAmount = 1600;
    component.secondaryAmount = 0;
    fixture.detectChanges();
    expect(component.primaryLineWidth).toBe(100);
    expect(component.secondaryLineWidth).toBe(0);
  });

  describe('should set only secondary line', () => {
    it('if secondary is eq to primary', () => {
      component.primaryAmount = 1600;
      component.secondaryAmount = 1600;
      fixture.detectChanges();
      expect(component.primaryLineWidth).toBe(0);
      expect(component.secondaryLineWidth).toBe(100);
    });

    it('if secondary is gr than primary', () => {
      component.primaryAmount = 1600;
      component.secondaryAmount = 1601;
      fixture.detectChanges();
      expect(component.primaryLineWidth).toBe(0);
      expect(component.secondaryLineWidth).toBe(100);
    });

    it('if  primary is 0 and secondary is gr than 0', () => {
      component.primaryAmount = 0;
      component.secondaryAmount = 1;
      fixture.detectChanges();
      expect(component.primaryLineWidth).toBe(0);
      expect(component.secondaryLineWidth).toBe(100);
    });
  });
});
