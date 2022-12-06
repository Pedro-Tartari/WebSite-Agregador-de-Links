import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CrudService } from 'src/app/services/crud/crud.service';

import { AngularFireStorage } from '@angular/fire/compat/storage';
import { UploadFileService } from 'src/app/services/uploadFile/upload-file.service';
import { HotToastService } from '@ngneat/hot-toast';
import { concatMap } from 'rxjs';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore, onSnapshot } from "firebase/firestore";
import { Id } from 'src/app/model/Id.models';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  name: string = '';
  formProduct: FormGroup;

  file: any;


  arrayId!: Id[];
private idCollection!: AngularFirestoreCollection<Id>;

  constructor(private authService: AuthService, 
    private crud: CrudService,
    private formBuilder: FormBuilder, 
    private toast: HotToastService, 
    private uploadFileService: UploadFileService, 
    private https: HttpClient, 
    private storage: AngularFireStorage,
    private aff: AngularFirestore,
    ) {
    this.formProduct = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      version: ['', Validators.compose([Validators.required])],
      txtArea: ['', Validators.compose([Validators.required])]

    })
  }

  ngOnInit(): void {
   
  }

   teste() {

    this.idCollection = this.aff.collection<Id>('ID');
    this.idCollection.valueChanges().subscribe(data => {
      this.arrayId = data;
      console.log(this.arrayId[0].id + 1)
    })

     
    // const db = getFirestore();
    // const docRef = doc(db, "ID","DocumentID");
    // getDoc(docRef).then((doc) => {
    //   console.log(doc.data(), doc.id)
    // })

    

    // onSnapshot(docRef, (doc) =>{
    //   console.log(doc.data, doc.id)
    // })

    // const docSnap = await getDoc(docRef);


    // if (docSnap.exists()) {
    //   // this.arrayId = docSnap.data();
    //   console.log("Document data:", docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  }

  uploadFile(event: any) {
    this.file = event.target.files[0];
    console.log(this.file.name);



    // this.uploadFileService.uploadFile(event.target.files[0], `novo/${this.selectTableDb()}`).pipe(
    //     this.toast.observe({
    //       loading: 'Esta sendo enviado ',
    //       success: 'Enviado',
    //       error: 'Houve um problema'
    //     })
    // ).subscribe();
  }

  onSubimit() {

    if (this.formProduct.valid && this.file) {
      this.crud.creat(this.formProduct.value, this.selectTableDb()).then((res) => {
        this.uploadFileService.uploadFile(this.file, this.file.name);
        this.formProduct.reset();
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
