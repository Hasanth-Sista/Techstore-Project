import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductSpecs } from '../models/product-specs';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';
import { CartService } from '../services/cart.service';
import { LoginService } from '../services/login.service';
import { UserDetails } from '../models/user-details';

@Component({
  selector: 'app-specifications',
  templateUrl: './specifications.component.html',
  styleUrls: ['./specifications.component.css']
})
export class SpecificationsComponent implements OnInit {
  product:Product;
  cart:Cart;
  user:UserDetails;
  message:String;
  product1:Product;

  constructor(private searchService:SearchService,private route:Router,
    private cartService:CartService,private loginService:LoginService)
   { }

  ngOnInit() {
    this.searchService.currentObject.subscribe(product=>this.product = product);
    this.cartService.cartObject.subscribe(cart=>this.cart=cart);
    this.loginService.userObject.subscribe(user=>this.user=user);   
    this.message=null;
  }
  addToCart(prod:Product){
    this.message="Product id "+prod.product_id+"  "+this.cartService.changeCart(prod);
    alert(this.message);
  }
  
}
