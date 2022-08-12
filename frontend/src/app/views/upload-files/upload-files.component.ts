import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CrudService } from 'src/app/services/crud/crud.service';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  formProduct: FormGroup;
 
  constructor(private authService: AuthService, private crud: CrudService,
    private http: HttpClient, private formBuilder: FormBuilder) { 
    this.formProduct = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      version:['',Validators.compose([Validators.required])],
      txtArea: ['',Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
    
    
  }

  onSubimit(){
    if (this.formProduct.valid) {
      this.crud.creat(this.formProduct.value)
    }
  }


}