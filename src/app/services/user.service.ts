import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../env';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = env.url;
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) { }

  login_user(log: any){
    const isLoggedIn = log && log.token;
    if(isLoggedIn){
      this._isLoggedIn.next(true);
    } else {
      this._isLoggedIn.next(false);
    }
  }

  get isLoggedIn(): Observable<boolean> {
    return this._isLoggedIn.asObservable();
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser(user: any) {
    this.currentUserSubject.next(user);
  }

  register(dto: RegisterDto){
    return this.http.post(`${this.url}/User/register`, dto);
  }

  login(credentioalns: any) {
    return this.http.post(`${this.url}/User/login`, credentioalns);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isLogedIn(){
    const token = localStorage.getItem('token');
    if(token){
      return true;
    }
    return false;
  }
  isOwner(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.roleId === 1){
      return true;
    }
    return false;
  }
  isDonator(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.roleId === 3){
      return true;
    }
    return false;
  }
  isCourier(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.roleId === 2){
      return true;
    }
    return false;
  }
  isBenefitiary(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.roleId === 4){
      return true;
    }
    return false;
  }
  hasImage(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if(user.image){
      return true;
    }
    return false;
  }
  getUserById(id: string){
    return this.http.get(`${this.url}/User/get-user-by-id/${id}`);
  }
  updateUser(id: string, dto: UpdateDto){
    return this.http.put(`${this.url}/User/update-user/${id}`, dto);
  }
  
  deleteUser(id: string){
    return this.http.delete(`${this.url}/User/delete/${id}`);
  }
  changePassword(id: string, dto: Pass){
    return this.http.put(`${this.url}/User/change-password/${id}`, dto);
  }
  getApprovedUsers(){
    return this.http.get(`${this.url}/User/get-all-approved`);
  }
  getPendingUsers(){
    return this.http.get(`${this.url}/User/get-all-pending`);
  }
  approveUser(id: string){
    return this.http.put(`${this.url}/User/approve-user/${id}`, {});
  }
  changeStatus(id: string){
    return this.http.put(`${this.url}/User/change-visibility/${id}`, {});
  }
}
export interface RegisterDto {
  firstName: string;
  lastName: string;
  userName: string;
  city: string;
  address: string;
  birthday: Date;
  password: string;
  roleId: number;
  status: boolean;
}
export interface UpdateDto{
  firstName: string;
  lastName: string;
  image: string;
  city: string;
  address: string;
  birthday: Date;
}

export interface Pass{
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

}