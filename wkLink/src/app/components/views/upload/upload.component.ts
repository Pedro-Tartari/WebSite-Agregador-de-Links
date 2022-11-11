import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CrudService } from 'src/app/services/crud/crud.service';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadFileService } from 'src/app/services/uploadFile/upload-file.service';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  name: string = '';
  formProduct: FormGroup;

  file: any;
 


  constructor(private authService: AuthService, private crud: CrudService,
    private formBuilder: FormBuilder,private toast: HotToastService ,private uploadFileService: UploadFileService , private https: HttpClient,private storage: AngularFireStorage) {
    this.formProduct = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      version: ['', Validators.compose([Validators.required])],
      txtArea: ['', Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
  }

  uploadFile(event: any){
    this.uploadFileService.uploadFile(event.target.files[0], `novo/${this.selectTableDb()}`).pipe(
        this.toast.observe({
          loading: 'Esta sendo enviado ',
          success: 'Enviado',
          error: 'Houve um problema'
        })
    ).subscribe();
  }

  onSubimit() {

    if (this.formProduct.valid) {
      this.crud.creat(this.formProduct.value, this.selectTableDb()).then((res) => {
        this.formProduct.reset();
        alert('Sucesso')
      })
        .catch((error) => {
          console.log(error)
        })
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
