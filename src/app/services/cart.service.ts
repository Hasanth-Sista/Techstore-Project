import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product } from '../models/product';
import { UserDetails } from '../models/user-details';
import { SearchService } from './search.service';
import { LoginService } from './login.service';
import { Cart } from '../models/cart';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CartService {
  cart:Cart[]=[];
  product:Product;

  private behaviorObjectCart = new BehaviorSubject<Cart>(null);
  cartObject = this.behaviorObjectCart.asObservable();

  constructor(private http:Http,private searchService:SearchService,private loginService:LoginService)
   { }

  zeroCart(){
    this.cart=[];
    console.log(this.cart);
  } 

  changeCart(cart: Cart) {
    this.cart.push(cart);
    this.behaviorObjectCart.next(cart);
    console.log(this.cart);
    return "Added to cart successfully";
  }

  getCartDetails(cart : Cart[]){
    return this.http.post("http://localhost:3000/cartDetails",this.cart).map(res=>res.json());
  }


}
