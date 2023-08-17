import { Component } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sent-notes',
  templateUrl: './sent-notes.component.html',
  styleUrls: ['./sent-notes.component.css']
})
export class SentNotesComponent {

  notes:any  = [];
  id:string = '';
  constructor(private noteService: NoteService,
    private router: Router,
    private Router: ActivatedRoute) {}

  ngOnInit(): void {
    this.Router.paramMap.subscribe(params => {
      this.id = String(params.get('id') ?? '');
      this.noteService.getAllNotesByUserId(this.id).subscribe(data => {
        this.notes = data as any;
        console.log(this.notes)
        console.log(this.notes.length)
      },
        err => {
          console.log(err)
        }) 
    },
      err => {
        console.log(err)
      })
    
    
  }
  getStars(review: number): number[] {
    return Array(review).fill(0);
  }
  See(id:number){
    this.noteService.UpdateNoteById(id).subscribe(data => {
      console.log(data)
      this.ngOnInit();
    }
    ,err => {
      console.log(err)
    }
    )
  }

}
