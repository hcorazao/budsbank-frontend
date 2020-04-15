import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfileUpdateComponent } from './admin-profile-update.component';

describe('AdminProfileUpdateComponent', () => {
  let component: AdminProfileUpdateComponent;
  let fixture: ComponentFixture<AdminProfileUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProfileUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
