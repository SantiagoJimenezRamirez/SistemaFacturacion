import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http: HttpClient, private router: Router) {}

  newFood(food:any){
    return this.http.post(`${environment.apiUrl}/api/product/addFood`, food)
  }
  getFood():Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/api/product/`)
  }
  getFoodByCategory(category:any){
    return this.http.get(`${environment.apiUrl}/api/product/`, category)
  }
}
