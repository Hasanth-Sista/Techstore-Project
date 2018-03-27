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
import { Router } from '@angular/router';
import { UserCart } from '../models/user-cart';

@Injectable()
export class CartService {
  cart:Cart;
  user:UserDetails;
  userCart:UserCart;

  private behaviorObjectCart = new BehaviorSubject<Cart>(null);
  cartObject = this.behaviorObjectCart.asObservable();
  

  constructor(private http:Http,private router:Router,private searchService:SearchService,private loginService:LoginService)
   {this.cart=new Cart();this.cart.product=new Array<Product>();
    this.userCart=new UserCart(); }


  zeroCart(){
    this.loginService.userObject.subscribe(user=>this.user=user);
    
    // this.userCart.user=new UserDetails();
    // this.userCart.cart=new Cart();
    this.userCart.user=this.user;
    this.userCart.cart=this.cart;
    console.log(this.userCart);
    this.http.post("http://localhost:3000/postCart",this.userCart).map(res=>res.json());
  
    //this.loginService.changeObject(null);
    //this.clearCart(null);
  } 

  changeCart(prod: Product) {
    prod.quantity=1;
    this.cart.product.push(prod);
    this.behaviorObjectCart.next(this.cart);
    return "Added to cart successfully";
  }

  clearCart(cart:Cart) {
    this.behaviorObjectCart.next(null);
    this.cart.product=new Array<Product>();
  }

  getCartDetails(){
    return this.cart;
  }

  getCartFromDb(user:UserDetails){
    this.loginService.userObject.subscribe(user=>this.user=user);
    console.log(this.user);
    return this.http.post("http://localhost:3000/getCartDetailsOfUser",this.user).map(res=>res.json());
  }

}
