import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDispensaryComponent } from './update-dispensary.component';

describe('UpdateDispensaryComponent', () => {
  let component: UpdateDispensaryComponent;
  let fixture: ComponentFixture<UpdateDispensaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDispensaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDispensaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
