import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CrudService } from 'src/app/services/crud/crud.service';

import { AngularFireStorage } from '@angular/fire/compat/storage';

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
    private formBuilder: FormBuilder, private https: HttpClient,private storage: AngularFireStorage) {
    this.formProduct = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      version: ['', Validators.compose([Validators.required])],
      txtArea: ['', Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
  }

  uploadFiles(event:any) {
    const file = event.target.files[0];
    const filePath = 'Teste';
    const task = this.storage.upload(filePath, file);
  }

  getFile(event: any){
    this.file = event.target.files[0];
    console.log("file", this.file);
  }

  uploadFile(){
    let formData = new FormData();
    formData.set("file", this.file)

    
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
