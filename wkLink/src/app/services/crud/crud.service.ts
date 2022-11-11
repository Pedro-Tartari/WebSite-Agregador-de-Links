import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from 'src/app/model/Produto.models';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public productList: any;
  lastId: string[] = [];
  number = 1;
 

  constructor(private afd: AngularFirestore) {
    
  }

  creat(product: Product, prod: string) {
    product.id = this.afd.createId();
    this.lastId.push(product.id);
    console.log(this.lastId)
    return this.afd.collection(prod).doc(this.randomNumber()).set(product)
  }

  randomNumber(){
    for (let i = 0; i < this.number; i++) {
      this.number++;  
      return String(this.number);
    }
    return;
  }

  update(product: Product) {
    return this.afd.collection('Produto').doc().set(product, { merge: true })
  }

 

  list() {
    return this.afd.collection('Produto').snapshotChanges();
  }

}
