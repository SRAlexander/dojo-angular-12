import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { IPlan } from '../models/iplan';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private _http: HttpClient) { }

  getPlans() : Observable<IPlan[]> {
    return this._http.get<IPlan[]>("http://localhost:3000/" + 'plans')
      .pipe(
        tap(data => { }),
        map((results) => 
          results.map(res => {
            let result : IPlan;
            result = {
                name : res.name,
                description: res.description,
                starting: res.starting,
                finishing: res.finishing,
                location: res.location,
                id: res.id,
                category: res.category
            }
            return result;
          })
        ),
        catchError(this.handleError)
      );
  }

  getCategories() : Observable<any> {
    return this._http.get<any>("http://localhost:3000/" + "categories")
      .pipe(
        tap(data => { 
          // Log, set flags, the data will not change if modified here
        }),
        catchError(this.handleError)
      );
  }

  postPlan(plan:any): Observable<any> {
    const body = JSON.stringify(plan);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = {headers: headers};
    return this._http.post<any>("http://localhost:3000/" + 'plans', body, options)
       .pipe(
          tap(data => {
          }),
          catchError(this.handleError)
       );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError(error.message);
  }
}
