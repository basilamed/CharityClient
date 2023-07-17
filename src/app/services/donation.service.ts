import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  getFilteredDonations(filters: DonationQuery, id: string) {
    let params = new HttpParams();
  
    if (filters.leftoverAmount) {
      params = params.append('LeftoverAmount', filters.leftoverAmount.toString());
    }

    if (filters.sortBy) {
      params = params.append('SortBy', filters.sortBy);
    }

    if (filters.isSortAscending != null) {
      params = params.append('IsSortAscending', filters.isSortAscending.toString());
    }

    if (filters.dateOfDonation) {
      const date = new Date(filters.dateOfDonation);
      const offset = date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
      const isoDate = new Date(date.getTime() - offset).toISOString();
      params = params.append('DateOfDonation', isoDate);
      console.log(isoDate);
    }

    if (filters.page) {
      params = params.append('Page', filters.page.toString());
    }

    if (filters.pageSize) {
      params = params.append('PageSize', filters.pageSize.toString());
    }
  
    return this.http.get(`${this.url}/Donation/all-donations-by-donator-id/${id}`, { params: params });
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
export interface DonationQuery {
  sortBy?: string;
  isSortAscending?: boolean;
  dateOfDonation?: string;
  leftoverAmount?: number;
  page: number;
  pageSize: number;
}
