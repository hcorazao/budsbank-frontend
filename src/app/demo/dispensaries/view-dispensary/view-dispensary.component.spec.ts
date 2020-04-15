import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDispensaryComponent } from './view-dispensary.component';

describe('ViewDispensaryComponent', () => {
  let component: ViewDispensaryComponent;
  let fixture: ComponentFixture<ViewDispensaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDispensaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDispensaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
