import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { LoginService } from '../services/login.service';
import { Product } from '../models/product';
import { UserDetails } from '../models/user-details';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart;
  user: UserDetails;
  product2: Array<Product>;

  product5: Array<Product>;
  cartDisplay: Cart;

  message: String;


  constructor(private searchService: SearchService, private loginService: LoginService,
    private cartService: CartService, private router: Router) {

  }

  orderHistory() {
    this.product5 = new Array<Product>();

    this.cartService.orderHistory(this.user).subscribe(
      (success) => {
        console.log(success.output);

        for (var i = 0; i < success.output.length; i++) {
          this.cartDisplay = success.output[i].cart;
          for (var j = 0; j < this.cartDisplay.product.length; j++) {
            this.product5.push(this.cartDisplay.product[j]);
          }
        }
      }
    );

  }

  ngOnInit() {
    var that = this;
    this.loginService.userObject.subscribe(function (user) {
      that.user = user;
      if (that.user == null) {
        that.router.navigate(['./login']);
      }
    });
    this.product2 = new Array<Product>();
    this.product2 = that.cartService.getCartDetails().product;

    this.cartService.cartObject.subscribe(cart => this.cart = cart);
    this.cart = that.cartService.getCartDetails();
    console.log(this.cart);

    this.product2 = this.cart.product;
  }

  checkOut() {
    this.cartService.cartObject.subscribe(cart => this.cart = cart);

    if (this.cart.product != null) {
      this.cartService.checkCart(this.cart.product).subscribe(
        (success) => {
          if (success[0] != "success") {
            alert(success);
          }
          else {
            var confirmation = confirm("Do you want to checkout?");
            if (confirmation) {
              this.cartService.checkOutCart().subscribe(
                (success) => {

                }
              );
              alert("Successfully checked out items");
              this.router.navigate(['']);
            }
          }
        },
        (error) => {
        }
      );
    }

  }
  update(quan: number, id: String) {
    //console.log(quan, id);
    if (quan < 0) {
      alert("Quantity cannot be negative");
    }
    if (quan == 0) {
      for (let prod of this.product2) {
        if (prod.product_id === id) {
          var index = this.cart.product.indexOf(prod);
          this.cart.product.splice(index, 1);
        }
      }
    } else {
      this.cart = new Cart();
      this.cart.product = new Array<Product>();
      for (let prod of this.product2) {
        if (prod.product_id === id) {
          prod.quantity = +quan;
        }
        this.cart.product.push(prod);
      }
    }
    this.cartService.cartObject.subscribe(cart => this.cart = cart);
    console.log(this.cart);
    return false;
  }

}
