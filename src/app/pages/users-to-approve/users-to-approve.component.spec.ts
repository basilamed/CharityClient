import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersToApproveComponent } from './users-to-approve.component';

describe('UsersToApproveComponent', () => {
  let component: UsersToApproveComponent;
  let fixture: ComponentFixture<UsersToApproveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersToApproveComponent]
    });
    fixture = TestBed.createComponent(UsersToApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
