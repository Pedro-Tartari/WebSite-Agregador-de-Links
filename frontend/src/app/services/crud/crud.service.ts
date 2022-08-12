import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from 'src/app/model/Produto,models';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private afd: AngularFirestore) { }

  creat(product : Product){
    product.id= this.afd.createId();
    this.afd.collection('Produto').doc().set(product)
    .then((res) => {
      console.log(res)
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  update(){

  }

  list(){

  }

  listById(){

  }

  delete(){

  }
}
