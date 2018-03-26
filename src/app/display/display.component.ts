import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Product } from '../models/product';
import { } from "@bootstrap";
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';
import { UserDetails } from '../models/user-details';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit {
  product : Product;  
  cart:Cart;
  user:UserDetails;
  message:String;
  constructor(private searchService : SearchService,private router:Router,
    private cartService:CartService,private loginService:LoginService) { }

  ngOnInit() {
    this.searchService.currentObject.subscribe(product=>this.product = product);
    this.cartService.cartObject.subscribe(cart=>this.cart=cart);
    this.loginService.userObject.subscribe(user=>this.user=user);   
    this.message=null;
  }

  seeSpecs(name:String){
    this.searchService.searchResult(name).subscribe(
      (success)=>{
        console.log(success);
        this.product=success.output;
        this.searchService.changeObject(this.product);
        this.router.navigate(['./specs']);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  addToCart(id:String,price:String){
    this.cart=new Cart();
    this.cart.product_id=id;
    this.cart.price=Number(price);
    this.message="Product Id "+id+"  "+this.cartService.changeCart(this.cart);
  }

}
