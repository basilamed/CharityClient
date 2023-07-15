import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfBenefitiariesComponent } from './list-of-benefitiaries.component';

describe('ListOfBenefitiariesComponent', () => {
  let component: ListOfBenefitiariesComponent;
  let fixture: ComponentFixture<ListOfBenefitiariesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListOfBenefitiariesComponent]
    });
    fixture = TestBed.createComponent(ListOfBenefitiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
