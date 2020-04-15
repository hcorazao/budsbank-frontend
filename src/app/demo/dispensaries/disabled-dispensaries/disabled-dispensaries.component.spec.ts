import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledDispensariesComponent } from './disabled-dispensaries.component';

describe('DisabledDispensariesComponent', () => {
  let component: DisabledDispensariesComponent;
  let fixture: ComponentFixture<DisabledDispensariesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabledDispensariesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabledDispensariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
