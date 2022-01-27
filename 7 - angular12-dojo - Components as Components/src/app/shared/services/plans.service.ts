import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private _http: HttpClient) { }

  getPlans() : Observable<any> {
    return this._http.get<any>("http://localhost:3000/" + "plans")
      .pipe(
        tap(data => { 
          // Log, set flags, the data will not change if modified here
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    return throwError(error.message);
  }
}
