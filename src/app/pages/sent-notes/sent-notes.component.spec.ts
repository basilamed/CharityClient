import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentNotesComponent } from './sent-notes.component';

describe('SentNotesComponent', () => {
  let component: SentNotesComponent;
  let fixture: ComponentFixture<SentNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SentNotesComponent]
    });
    fixture = TestBed.createComponent(SentNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
