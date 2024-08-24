import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Import catchError operator
import { Item } from './items/items'; // Ensure correct import path

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'http://localhost:3000/items'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }
  createItem(item:Item): Observable<Item>{
    console.log(item)
    return this.http.post<Item>(this.apiUrl, item);
  }
  deleteItem(id:string):Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  updateItem(id:string,item:Item):Observable<any>{
    console.log("====>",id,item)
    return this.http.put(`${this.apiUrl}/${id}`,item);
  }

}