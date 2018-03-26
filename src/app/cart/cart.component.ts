import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { LoginService } from '../services/login.service';
import { Product } from '../models/product';
import { UserDetails } from '../models/user-details';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart[] = [];
  user: UserDetails;
  constructor(private searchService: SearchService, private loginService: LoginService,
    private cartService: CartService, private router: Router) { }

  ngOnInit() {
    var that = this;
    this.loginService.userObject.subscribe(function (user) {
      that.user = user;
      if (that.user == null) {
        that.router.navigate(['./login']);
      }
      else{
        that.cartService.getCartDetails(this.cart).subscribe(
          (success)=>{
            console.log(success); 
          }
        )
      }
    });
  }

}
