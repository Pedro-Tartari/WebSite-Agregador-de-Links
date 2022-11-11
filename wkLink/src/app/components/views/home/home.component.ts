import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Product } from 'src/app/model/Produto.models';
import { CrudService } from 'src/app/services/crud/crud.service';

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


  constructor(private aff: AngularFirestore, public crud: CrudService, private storage: AngularFirestore) {
  }

  ngOnInit(): void {

    // this.update.init();
    // this.update.returnData();
    let arrayProd: string[] = ['Studio', 'Adm', 'Rcp', 'Cart', 'Censura', 'Stream'];
    for (let index = 0; index < arrayProd.length; index++) {
      this.getInfoFromDB(arrayProd[index]);



      this.aff.collection(arrayProd[index]).valueChanges()
        .subscribe(val => {

          console.log(val);
        });
    }

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
    }
    if (produto == 'Adm') {
      this.arrayAdm = data;
      const last = this.arrayAdm[this.arrayAdm.length - 1];
      this.lastAdmL = last.txtArea;
      this.lastAdm = last.version;
    }
    if (produto == 'Rcp') {
      this.arrayRcp = data;
      const last = this.arrayRcp[this.arrayRcp.length - 1];
      this.lastRcpL = last.txtArea;
      this.lastRcp = last.version;
    }
    if (produto == 'Cart') {
      this.arrayCart = data;
      const last = this.arrayCart[this.arrayCart.length - 1];
      this.lastCartL = last.txtArea;
      this.lastCart = last.version;
    }
    if (produto == 'Censura') {
      this.arrayCensura = data;
      const last = this.arrayCensura[this.arrayCensura.length - 1];
      this.lastCensuraL = last.txtArea;
      this.lastCensura = last.version;
    }
    if (produto == 'Stream') {
      this.arrayStream = data;
      const last = this.arrayStream[this.arrayStream.length - 1];
      this.lastStreamL = last.txtArea;
      this.lastStream = last.version;
    }
  }

}
