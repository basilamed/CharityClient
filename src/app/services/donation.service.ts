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
  getDonationsByCategoryId(id: number){
    return this.http.get(`${this.url}/Donation/donation-by-category-id/${id}`);
  }
  getTotalByCategoryId(id: number){
    return this.http.get(`${this.url}/Donation/get-total-by-category-id/${id}`);
  }
  getLeftoverByCategoryId(id: number){
    return this.http.get(`${this.url}/Donation/get-leftover-by-category-id/${id}`);
  }
  addDonation(dto: DonationDto){
    return this.http.post(`${this.url}/Donation/add-donation`, dto);
  }
  addUserDonation(dto: UserDonationDto){
    return this.http.post(`${this.url}/Donation/add-donation-user`, dto);
  }
  getTotal(id: string, category: number){
    return this.http.get(`${this.url}/Donation/get-total-by-benefitiary-id/${id}/${category}`);
  }
  
}
export interface DonationDto{
  donationAmount: number;
  categoryId: number;
  donatorId: string;
}
export interface UserDonationDto{
  donationId: number;
  benefitiaryId: string;
  amount: number;
}
