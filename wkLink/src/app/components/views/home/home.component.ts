import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Product } from 'src/app/model/Produto.models';
import { CrudService } from 'src/app/services/crud/crud.service';
import { HttpClient } from '@angular/common/http';

import { getStorage, ref, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentPage$: any

  private prodCollection!: AngularFirestoreCollection<Product>;
  arrayStudio!: Product[];
  arrayAdm!: Product[];
  arrayRcp!: Product[];
  arrayCart!: Product[];
  arrayCensura!: Product[];
  arrayStream!: Product[];


  lastStudioV: any;
  lastStudioL: any
  lastAdm: any;
  lastRcp: any
  lastRcpL: any;
  lastCartL: any
  lastCart: any;
  lastCensuraL: any
  lastCensura: any;
  lastStreamL: any
  lastStream: any;
  lastAdmL: any

  profileUrl!: string;

  instaladorUrlStudio: any;
  instaladorUrlAdm: any;

  atualizadorUrlAdm: any;
  atualizadorUrlStudio: any;
  atualizadorUrlCensura: any;
  atualizadorUrlStream: any;
  atualizadorUrlCartucho: any;
  atualizadorUrlRcp: any;

  dateStudio: any;
  dateAdm: any;
  dateRcp: any;
  dateCart: any;
  dateCensura: any;
  dateStream: any;

  constructor(private aff: AngularFirestore, public crud: CrudService, private storage: AngularFirestore, private http: HttpClient) {
  }

  ngOnInit(): void {
    let arrayProd: string[] = ['Studio', 'Adm', 'Rcp', 'Cart', 'Censura', 'Stream'];
    for (let index = 0; index < arrayProd.length; index++) {
      this.getInfoFromDB(arrayProd[index]);
      this.aff.collection(arrayProd[index]).valueChanges()
        .subscribe(val => {

          console.log(val);
        });
    }


    this.getInstaladorStudio();
    this.getInstaladorAdm();
    this.getUpdateAdm();
    this.getUpdateCartucho();
    this.getUpdateCensura();
    this.getUpdateRcp();
    this.getUpdateStream();
    this.getUpdateStudio();

  }

  getInfoFromDB(produto: string) {
    this.prodCollection = this.aff.collection<Product>(produto);
    this.prodCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Product;
          return { ...data };
        }))
      )
      .subscribe((data) => {
        this.setDataInArray(data, produto)
      })
  }

  setDataInArray(data: Product[], produto: string) {
    if (produto == 'Studio') {
      this.arrayStudio = data;
      const last = this.arrayStudio[this.arrayStudio.length - 1];
       this.lastStudioL = last.txtArea;
      this.lastStudioV = last.version;
      this.dateStudio = this.formatDate(last.date);

    }
    if (produto == 'Adm') {
      this.arrayAdm = data;
      const last = this.arrayAdm[this.arrayAdm.length - 1];
      this.lastAdmL = last.txtArea;
      this.lastAdm = last.version;
      this.dateAdm = this.formatDate(last.date);
    }
    if (produto == 'Rcp') {
      this.arrayRcp = data;
      const last = this.arrayRcp[this.arrayRcp.length - 1];
      this.lastRcpL = last.txtArea;
      this.lastRcp = last.version;
      this.dateRcp = this.formatDate(last.date);
    }
    if (produto == 'Cart') {
      this.arrayCart = data;
      const last = this.arrayCart[this.arrayCart.length - 1];
      this.lastCartL = last.txtArea;
      this.lastCart = last.version;
      this.dateCart = this.formatDate(last.date);
    }
    if (produto == 'Censura') {
      this.arrayCensura = data;
      const last = this.arrayCensura[this.arrayCensura.length - 1];
      this.lastCensuraL = last.txtArea;
      this.lastCensura = last.version;
      this.dateCensura = this.formatDate(last.date);
    }
    if (produto == 'Stream') {
      this.arrayStream = data;
      const last = this.arrayStream[this.arrayStream.length - 1];
      this.lastStreamL = last.txtArea;
      this.lastStream = last.version;
      this.dateStream = this.formatDate(last.date);
    }
  } 

   formatDate (input: any) {
    var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1], day = datePart[2];
  
    return day+'/'+month+'/'+year;
  }

  getInstaladorStudio() {
    const storages = getStorage();
    const pathReference = ref(storages, 'instaladores/INSTALAR-85.exe');
    getDownloadURL(pathReference)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();

        this.instaladorUrlStudio = url;
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  getInstaladorAdm() {
    const storages = getStorage();
    const pathReference = ref(storages, 'instaladores/INSTALAR-ADM.exe');
    getDownloadURL(pathReference)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        console.log(url + " att")
        this.instaladorUrlAdm = url;
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  getUpdateAdm() {
    const storages = getStorage();
    const pathReference = ref(storages, 'atualizadores/UPDATE-ADM.exe');
    getDownloadURL(pathReference)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        this.atualizadorUrlAdm = url;
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  getUpdateStudio() {
    const storages = getStorage();
    const pathReference = ref(storages, 'atualizadores/UPDATE_STUDIO.exe');
    getDownloadURL(pathReference)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        this.atualizadorUrlStudio = url;
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  getUpdateCensura() {
    const storages = getStorage();
    const pathReference = ref(storages, 'atualizadores/INSTALAR_WINREC40.exe');
    getDownloadURL(pathReference)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        this.atualizadorUrlCensura = url;
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  getUpdateStream() {
    const storages = getStorage();
    const pathReference = ref(storages, 'atualizadores/INSTALAR_SIKCAST-HD.exe');
    getDownloadURL(pathReference)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        this.atualizadorUrlStream = url;
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  getUpdateCartucho() {
    const storages = getStorage();
    const pathReference = ref(storages, 'atualizadores/INSTALAR-WINCART60.exe');
    getDownloadURL(pathReference)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        this.atualizadorUrlCartucho = url;
      })
      .catch((error) => {
        // Handle any errors
      });
  }

  getUpdateRcp() {
    const storages = getStorage();
    const pathReference = ref(storages, 'atualizadores/INSTALAR-RCP.exe');
    getDownloadURL(pathReference)
      .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        this.atualizadorUrlRcp = url;
      })
      .catch((error) => {
        // Handle any errors
      });
  }
}
