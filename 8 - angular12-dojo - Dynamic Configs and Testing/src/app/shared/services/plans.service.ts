import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  constructor(private _http: HttpClient) { }

  getPlans() : Observable<any> {
    return this._http.get<any>(environment.apiEndpoint + "plans")
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
