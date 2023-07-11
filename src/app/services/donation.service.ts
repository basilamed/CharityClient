import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../env';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  url = env.url;

  constructor(private http: HttpClient) { }

  getAllDonations(){
    return this.http.get(`${this.url}/Donation/all-donations`);
  }
  getDonationById(id: number){
    return this.http.get(`${this.url}/Donation/donation-by-id/${id}`);
  }
  getDonationsByDonatorId(id: string){
    return this.http.get(`${this.url}/Donation/all-donations-by-donator-id/${id}`);
  }
  addDonation(dto: DonationDto){
    return this.http.post(`${this.url}/Donation/add-donation`, dto);
  }
}
export interface DonationDto{
  donationAmount: number;
  categoryId: number;
  donatorId: string;
}
