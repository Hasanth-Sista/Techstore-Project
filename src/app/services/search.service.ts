import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product } from '../models/product';
import { UserDetails } from '../models/user-details';
import { ProductQuantity } from '../models/product-quantity';

@Injectable()
export class SearchService {
  
  private behaviorObject = new BehaviorSubject<Product>(null);
  currentObject = this.behaviorObject.asObservable();


  private behaviorObjectUser = new BehaviorSubject<UserDetails>(null);
  userObject = this.behaviorObjectUser.asObservable();


  constructor(private http : Http) { }

  update(prod:Product){
    return this.http.post("http://localhost:3000/update",prod).map(res=>res.json());
  }
  updateQuan(quan:ProductQuantity){
    return this.http.post("http://localhost:3000/updateQuan",quan).map(res=>res.json());
  }

  delete(prod:Product){
    return this.http.get("http://localhost:3000/delete/"+prod.product_id).map(res=>res.json());
  }
  
  displayAll(){
    return this.http.get("http://localhost:3000/all").map(res=>res.json());
  }
  displayQuantity(){
    return this.http.get("http://localhost:3000/allQuan").map(res=>res.json());
  }

  searchResult(searchString : String){
    return this.http.get("http://localhost:3000/display/"+searchString).map(res=>res.json());
  }  
  
  changeObject(product: Product) {
    this.behaviorObject.next(product);
  }

  signUpUser(user:UserDetails){
    user.role="user";
    return this.http.post("http://localhost:3000/signup/",user).map(res=>res.json());
  }

  signInUser(user:UserDetails){
    return this.http.post("http://localhost:3000/login",user).map(res=>res.json());
  }
}
