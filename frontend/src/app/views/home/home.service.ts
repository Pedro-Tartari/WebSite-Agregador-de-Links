import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'jquery';
import { catchError, Observable } from 'rxjs';
// import { UploadInterface } from './upload.module';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = "http://localhost:3001/uploads";

  constructor(private http: HttpClient) { }

  // read(): Observable<UploadInterface[]> {
  //   return this.http.get<UploadInterface[]>(this.baseUrl).pipe(
      
  //   );
  // }
}
