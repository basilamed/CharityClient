import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyToCategoryComponent } from './apply-to-category.component';

describe('ApplyToCategoryComponent', () => {
  let component: ApplyToCategoryComponent;
  let fixture: ComponentFixture<ApplyToCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplyToCategoryComponent]
    });
    fixture = TestBed.createComponent(ApplyToCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
