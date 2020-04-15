import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispensariesListComponent } from './dispensaries-list.component';

describe('DispensariesListComponent', () => {
  let component: DispensariesListComponent;
  let fixture: ComponentFixture<DispensariesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispensariesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispensariesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
