import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendThankYouNoteComponent } from './send-thank-you-note.component';

describe('SendThankYouNoteComponent', () => {
  let component: SendThankYouNoteComponent;
  let fixture: ComponentFixture<SendThankYouNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendThankYouNoteComponent]
    });
    fixture = TestBed.createComponent(SendThankYouNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
