import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecivedNotesComponent } from './recived-notes.component';

describe('RecivedNotesComponent', () => {
  let component: RecivedNotesComponent;
  let fixture: ComponentFixture<RecivedNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecivedNotesComponent]
    });
    fixture = TestBed.createComponent(RecivedNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
