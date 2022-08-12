import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';
// import { UploadInterface } from './upload.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // uploads!: UploadInterface[];


  constructor(
    private http: HttpClient, 
    private homeService: HomeService,
     ) { }

  ngOnInit(): void {
  

    // this.homeService.read().subscribe(uploads => {
    //   this.uploads = uploads
    //   console.log(uploads)
    // } )

  }

  // getData(): Observable<UploadInterface[]>{
  //   return this.http.get<UploadInterface[]>('http://localhost:3001/uploads');
  // }

}
