import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../env';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  url = env.url;

  constructor(private http: HttpClient) { }

  getAllNotesByUserId(id: string){
    return this.http.get(`${this.url}/Note/all-notes-by-user-id/${id}`);
  }
  getAllNotesByDonatorId(id: string){
    return this.http.get(`${this.url}/Note/all-notes-by-donator-id/${id}`);
  }
  getAllNotesByDonationId(id: number){
    return this.http.get(`${this.url}/Note/all-notes-by-donation-benefitiary-id/${id}`);
  }
  addNoteToDonation(dto: UserDonatorNoteDto){
    return this.http.post(`${this.url}/Note/add-user-donator-note`, dto);
  }
  addNote(dto: NoteDto){
    return this.http.post(`${this.url}/Note/add-note`, dto);
  }
  UpdateNoteById(id: number){
    return this.http.put(`${this.url}/Note/see-note/${id}`, null);
  }
}
export interface NoteDto{
  text: string;
  review: number;
}
export interface UserDonatorNoteDto{
  userId: string;
  donatorId: string;
  donation_Benefitiary_Id: number;
  noteId: number;
}
