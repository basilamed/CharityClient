import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from '../env';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = env.url;

  constructor(private http: HttpClient) { }

  getAllCategories(){
    return this.http.get(`${this.url}/Category/all-categories`);
  }
  getAllCategoriesWithUsers(){
    return this.http.get(`${this.url}/Category/all-categories-with-users`);
  }
  getCategoryByUserId(id: string){
    return this.http.get(`${this.url}/Category/get-category-by-user-id/${id}`);
  }
  getPendingCategoryByUserId(id: string){
    return this.http.get(`${this.url}/Category/get-pending-category-by-user-id/${id}`);
  }
  createCategory(dto: CategoryDto){
    return this.http.post(`${this.url}/Category/add-category`, dto);
  }
  addUserToCategory(dto: CategoryWithUsersDto){
    return this.http.post(`${this.url}/Category/add-user`, dto);
  }
  removeUserFromCategory(dto: CategoryWithUsersDto){
    return this.http.post(`${this.url}/Category/remove-user-category`, dto);
  } 
}
export interface CategoryDto{
  name: string;
}
export interface CategoryWithUsersDto{
  categoryId: number;
  userId: string;
}
