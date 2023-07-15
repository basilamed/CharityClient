import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecivedDonationsComponent } from './recived-donations.component';

describe('RecivedDonationsComponent', () => {
  let component: RecivedDonationsComponent;
  let fixture: ComponentFixture<RecivedDonationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecivedDonationsComponent]
    });
    fixture = TestBed.createComponent(RecivedDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
