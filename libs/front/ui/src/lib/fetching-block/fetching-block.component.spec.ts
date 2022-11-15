import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchingBlockComponent } from './fetching-block.component';

describe('FetchingBlockComponent', () => {
  let component: FetchingBlockComponent;
  let fixture: ComponentFixture<FetchingBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchingBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
