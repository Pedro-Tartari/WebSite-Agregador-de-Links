import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Product } from 'src/app/model/Produto.models';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  private prodCollection!: AngularFirestoreCollection<Product>;  
  arrayStudio!: Product[];
  arrayAdm!: Product[];
  arrayRcp!: Product[];
  arrayCart!: Product[];
  arrayCensura!: Product[];
  arrayStream!: Product[];
 
  lastStudio: any;
  lastAdm: any;
  lastRcp: any;
  lastCart: any;
  lastCensura: any;
  lastStream: any;

 

  constructor(private aff: AngularFirestore) { }


init(){
  let arrayProd: string[] = ['Studio', 'Adm', 'Rcp','Cart','Censura','Stream'];
    for (let index = 0; index < arrayProd.length; index++) {
     return  this.getInfoFromDB(arrayProd[index]);  
}
}


getInfoFromDB(produto: string){
  this.prodCollection = this.aff.collection<Product>(produto);
  this.prodCollection.snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Product;
        return { ...data };
      }))
    )
    .subscribe((data) =>{
      this.setDataInArray(data, produto)    
    } )
}

setDataInArray(data: Product[], produto: string){
  if (produto == 'Studio') {
    this.arrayStudio = data; 
    this.lastStudio = this.arrayStudio[0].version;
  } 
  if (produto == 'Adm') {
    this.arrayAdm = data; 
    this.lastAdm = this.arrayAdm[0].version;
  } 
  if (produto == 'Rcp') {
    this.arrayRcp = data; 
    this.lastRcp = this.arrayRcp[0].version;
  } 
  if (produto == 'Cart') {
    this.arrayCart = data; 
    this.lastCart = this.arrayCart[0].version;
  } 
  if (produto == 'Censura') {
    this.arrayCensura = data; 
    this.lastCensura = this.arrayCensura[0].version;
  } 
  if (produto == 'Stream') {
    this.arrayStream = data; 
    this.lastStream = this.arrayStream[0].version;
  } 

}

returnData (){
  alert(this.arrayStudio[0].version);
  
  return this.arrayStudio[0].version;
  
}
}
