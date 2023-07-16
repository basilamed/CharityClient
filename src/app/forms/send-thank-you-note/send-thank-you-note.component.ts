import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DonationService } from 'src/app/services/donation.service';
import { UserService } from 'src/app/services/user.service';
import { NoteService, NoteDto, UserDonatorNoteDto } from 'src/app/services/note.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from 'src/app/confirmation/confirmation/confirmation.component';

interface Note{
  id: number;
  text: string;
  review: number;
  dateTime: string;
  notes: null;
}
@Component({
  selector: 'app-send-thank-you-note',
  templateUrl: './send-thank-you-note.component.html',
  styleUrls: ['./send-thank-you-note.component.css']
})
export class SendThankYouNoteComponent {

  saved: boolean = false;
  userDetails: any = {}
  id: string = '';
  dbid: number = 0;
  donationId: number = 0;
  savedNote: Note= {
    id: 0,
    text: '',
    review: 0,
    dateTime: '',
    notes: null
  }
  donationDetails: any = {}

  form = new FormGroup({  
    text: new FormControl('', [Validators.required, Validators.maxLength(200)]),
    review: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
  });

  constructor(private router: ActivatedRoute,
    public UserService: UserService,
    public Router : Router,
    public DonationService: DonationService,
    public NoteService: NoteService,
    private dialog : MatDialog
    ) { }

    ngOnInit(): void {
      this.router.paramMap.subscribe(params => {
        this.id = String(params.get('id') ?? '');
        this.dbid = Number(params.get('db_id') ?? 0);
        this.donationId = Number(params.get('d_id') ?? 0);
        this.UserService.getUserById(this.id).subscribe(data => {
          this.userDetails = data;
          console.log(this.userDetails)
        },
          err => {
            console.log(err)
        })
        this.DonationService.getDonationById(this.donationId).subscribe(data => {
          this.donationDetails = data;
          console.log(this.donationDetails)
      })
      },
        err => {
          console.log(err)
      })
    }
    get Text() 
    { return this.form.get('text'); }

    get Review() 
    { return this.form.get('review'); }

    async openConfirmationDialog(): Promise<void> {
      const dialogRef = this.dialog.open(ConfirmationComponent);
      try {
        const result = await dialogRef.afterClosed().toPromise();
        if (result) {
          await this.Send();
        }
      } catch (error) {
        console.log(error);
      }
    }
    SaveNote() {
      let note: NoteDto = {
        text: (this.Text?.value ?? ''),
        review: +(this.Review?.value ?? 0)
      }
      this.NoteService.addNote(note).subscribe(data => {
        this.saved = true;
        this.savedNote = data as Note;

        console.log(this.savedNote)
      },
        err => {
          console.log(err)
      })
    }
    Send() {
      let note: UserDonatorNoteDto = {
        noteId: this.savedNote?.id ?? 0,
        userId: this.id,
        donation_Benefitiary_Id: this.dbid,
        donatorId: this.donationDetails?.donatorId ?? ''
      }
      console.log(note)
      this.NoteService.addNoteToDonation(note).subscribe(data => {
        this.saved = true;
        console.log(data)
        this.Router.navigate([`/recived-donations/${this.id}`]);
      },
        err => {
          console.log(err)
      })
    }
}
