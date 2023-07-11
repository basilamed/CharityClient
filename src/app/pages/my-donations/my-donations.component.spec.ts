import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDonationsComponent } from './my-donations.component';

describe('MyDonationsComponent', () => {
  let component: MyDonationsComponent;
  let fixture: ComponentFixture<MyDonationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyDonationsComponent]
    });
    fixture = TestBed.createComponent(MyDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
