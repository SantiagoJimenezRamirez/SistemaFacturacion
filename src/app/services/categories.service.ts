import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient, private router: Router) {}

  newCategory(name:string){
    return this.http.post(`${environment.apiUrl}/api/categories/addCategory`, name)
  }

  getCategories(){
    return this.http.get(`${environment.apiUrl}/api/categories`)
  }
}
