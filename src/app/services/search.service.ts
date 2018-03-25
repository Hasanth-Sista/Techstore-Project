import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product } from '../models/product';
import { UserDetails } from '../models/user-details';

@Injectable()
export class SearchService {
  
  private behaviorObject = new BehaviorSubject<Product>(null);
  currentObject = this.behaviorObject.asObservable();


  private behaviorObjectUser = new BehaviorSubject<UserDetails>(null);
  userObject = this.behaviorObjectUser.asObservable();


  constructor(private http : Http) { }

  searchResult(searchString : String){
    return this.http.get("http://localhost:3000/display/"+searchString).map(res=>res.json());
  }  
  
  changeObject(product: Product) {
    this.behaviorObject.next(product);
  }

  signUpUser(user:UserDetails){
    return this.http.post("http://localhost:3000/signup/",user).map(res=>res.json());
  }

  signInUser(user:UserDetails){
    return this.http.post("http://localhost:3000/login",user).map(res=>res.json());
  }
}
