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

  name: string = '';
  formProduct: FormGroup;

  constructor(private authService: AuthService, private crud: CrudService,
    private formBuilder: FormBuilder) {
    this.formProduct = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      version: ['', Validators.compose([Validators.required])],
      txtArea: ['', Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
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