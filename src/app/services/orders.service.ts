import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient, private router: Router) { }

  newOrder(food:any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/api/order/addOrder`, food)
  }
}
