import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/Produto.models';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public productList: any;
 

  constructor(private afd: AngularFirestore) {
    
  }

  creat(product: Product, coll: string) {
    return this.afd.collection(coll).doc().set(product)

  }

  update(product: Product) {
    return this.afd.collection('Produto').doc().set(product, { merge: true })
  }

 

  list() {
    return this.afd.collection('Produto').snapshotChanges();
  }

  
}
