import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product } from '../models/product';

@Injectable()
export class SearchService {

  private behaviorObject = new BehaviorSubject<Product>(null);
  currentObject = this.behaviorObject.asObservable();

  constructor(private http : Http) { }

  searchResult(searchString : String){
    
    return this.http.get("http://localhost:3000/hasanth/"+searchString).map(res=>res.json());
  }  
  
  changeObject(product: Product) {
    this.behaviorObject.next(product);
  }
}
