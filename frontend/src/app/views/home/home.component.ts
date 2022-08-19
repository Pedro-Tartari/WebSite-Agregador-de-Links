import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable, of, take } from 'rxjs';
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
  array!: Product[];
 


  constructor(private aff: AngularFirestore, public crud: CrudService) {
  }

  ngOnInit(): void {
    let arrayProd: string[] = ['Studio', 'Adm'];
    for (let index = 0; index < arrayProd.length; index++) {
      this.getInfoToArray(arrayProd[index]);  
    }
  }

  getInfoToArray(produto: string){
    this.prodCollection = this.aff.collection<Product>(produto);
    this.prodCollection.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Product;
          return { ...data };
        }))
      )
      .subscribe((data) =>{
        this.array = data; 
        console.log(data)
      } )
  }



}
