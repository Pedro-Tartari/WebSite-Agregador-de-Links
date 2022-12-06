import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { doc, getFirestore, increment, updateDoc } from 'firebase/firestore';
import { Id } from 'src/app/model/Id.models';
import { Product } from 'src/app/model/Produto.models';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  public productList: any;
  lastId: string[] = [];
  number: any;

  arrayId!: Id[];
  private idCollection!: AngularFirestoreCollection<Id>;

  constructor(private afd: AngularFirestore) {
    this.randomNumber();
  }

  creat(product: Product, prod: string) {
    product.id = this.afd.createId();
    this.lastId.push(product.id);
    console.log(this.lastId)
    this.incrementNumber();
    return this.afd.collection(prod).doc(String(this.number)).set(product)
  }

  randomNumber() {
    this.idCollection = this.afd.collection<Id>('ID');
    this.idCollection.valueChanges().subscribe(data => {
      this.arrayId = data;
      this.number = this.arrayId[0].id;
      console.log(this.number)
    })
  }

  async incrementNumber(){
    const db = getFirestore();
    const docRef = doc(db, "ID","DocumentID");
    await updateDoc(docRef, {
      id: increment(1)
    })
  }

  update(product: Product) {
    return this.afd.collection('Produto').doc().set(product, { merge: true })
  }



  list() {
    return this.afd.collection('Produto').snapshotChanges();
  }

}
