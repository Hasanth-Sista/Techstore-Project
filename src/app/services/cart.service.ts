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
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CartService {
  cart: Cart;
  user: UserDetails;
  userCart: UserCart;

  private behaviorObjectCart = new BehaviorSubject<Cart>(null);
  cartObject = this.behaviorObjectCart.asObservable();


  constructor(private http: Http, private router: Router, private searchService: SearchService, private loginService: LoginService) {
    this.cart = new Cart(); this.cart.product = new Array<Product>();
    this.userCart = new UserCart();
  }
  orderHistory(user:UserDetails) {
    return this.http.get("http://localhost:3000/orderHistory/" + user.email).map(res => res.json());
  }

  checkCart(prod: Product[]) {
    let requests = [];

    for (var i = 0; i < prod.length; i++) {
      requests.push(this.http.post("http://localhost:3000/checkCart", prod[i]).map(res => res.json()));
    }
    return Observable.forkJoin(requests).map((data: any[]) => {
      var failure = [], pass = [];
      for (var i = 0; i < data.length; i++) {
        if (data[i].message != "success") {
          failure.push(data[i].message);
        } else {
          pass.push(data[i].message);
        }
      }
      //console.log(failure);
      //console.log(pass);
      if (failure.length == 0) {
        return pass;
      }
      else {
        return failure;
      }
    }
    );
  }

  subChangeCart(cart: Cart) {
    this.behaviorObjectCart.next(cart);
    this.cartObject.subscribe(cart => this.cart = cart);
  }

  zeroCart() {
    this.loginService.userObject.subscribe(user => this.user = user);
    this.cartObject.subscribe(cart => this.cart = cart);
    this.userCart.user = this.user;
    this.userCart.cart = this.cart;
    console.log(this.userCart);
    this.http.post("http://localhost:3000/postCart", this.userCart).map(res => res.json()).subscribe(
      (success) => {
        console.log(success);
      }, (error) => {
      }
    );

    this.loginService.changeObject(null);
    this.clearCart(null);
  }

  changeCart(prod: Product) {
    prod.quantity = 1;
    if (this.user != null) {
      this.cartObject.subscribe(cart => this.cart = cart);
    }
    console.log(this.cart);
    var flag = false;
    for (let prodi of this.cart.product) {
      if (prodi.product_id === prod.product_id) {
        prodi.quantity += +1;
        flag = true;
      }
    }
    if (flag != true) {
      this.cart.product.push(prod);
    }
    this.behaviorObjectCart.next(this.cart);
    return "Added to cart successfully";
  }

  checkOutCart() {
    console.log(this.cart);
    let requests = [];

    this.loginService.userObject.subscribe(user => this.user = user);
    this.cartObject.subscribe(cart => this.cart = cart);
    this.userCart.user = this.user;
    this.userCart.cart = this.cart;

    this.http.post("http://localhost:3000/addCheckedOutCart", this.userCart).map(res => res.json()).subscribe();

    for (var i = 0; i < this.cart.product.length; i++) {
      requests.push(this.http.post("http://localhost:3000/checkOutCart", this.cart.product[i]).map(res => res.json()));
    }

    this.cartObject.subscribe(null);
    this.cart=new Cart();
    this.behaviorObjectCart.subscribe(null);

    return Observable.forkJoin(requests).map((data: any[]) => {
      return "";
    });

  }

  clearCart(cart: Cart) {
    this.behaviorObjectCart.next(null);
    //this.cart.product = new Array<Product>();
  }

  getCartDetails() {
    return this.cart;
  }

  getCartFromDb(user: UserDetails) {
    this.loginService.userObject.subscribe(user => this.user = user);
    console.log(this.user);
    return this.http.post("http://localhost:3000/getCartDetailsOfUser", this.user).map(res => res.json());
  }

}
