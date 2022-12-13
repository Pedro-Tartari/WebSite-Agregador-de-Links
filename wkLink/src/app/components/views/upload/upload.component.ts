import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CrudService } from 'src/app/services/crud/crud.service';

import { UploadFileService } from 'src/app/services/uploadFile/upload-file.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, AfterViewInit {
  name: string = '';
  formProduct: FormGroup;

  file: any;

  @ViewChild('myDate') anyName!: ElementRef;

  constructor(private authService: AuthService,
    private crud: CrudService,
    private formBuilder: FormBuilder,
    private toast: HotToastService,
    private uploadFileService: UploadFileService
  ) {
    this.formProduct = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      version: ['', Validators.compose([Validators.required])],
      txtArea: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])]
    })
    
  }

  ngOnInit(): void {
   
  }

  ngAfterViewInit(): void {
    this.anyName.nativeElement.valueAsDate = new Date();
  }


  uploadFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file.name);
  }

  onSubimit() {
    if (this.formProduct.valid && this.file) {
      this.crud.creat(this.formProduct.value, this.selectTableDb()).then((res) => {
        this.uploadFileService.uploadFile(this.file, this.file.name);
        this.formProduct.reset();
        this.anyName.nativeElement.valueAsDate = new Date();
        this.file = undefined;
      })
        .catch((error) => {
          console.log(error)
        })
    }
    else {
      this.toast.error("Campos em Branco")
      
    }
  }

  selectTableDb() {
    switch (this.formProduct.controls['name'].value) {
      case 'Studio': {
        return 'Studio';
      }
      case 'Administrativo': {
        return 'Adm';
      }
      case 'Recepção': {
        return 'Rcp';
      }
      case 'Cartucheira': {
        return 'Cart';
      }
      case 'Censura': {
        return 'Censura';
      }
      case 'Streaming': {
        return 'Stream';
      }
      default: {
        return '';
      }
    }
  }
}
