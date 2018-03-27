import { Component, OnInit } from '@angular/core';
import { UserDetails } from '../models/user-details';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserDetails;
  message: String;
  cart: Cart;

  constructor(private service: SearchService, private router: Router,
    private loginService: LoginService, private cartService: CartService) { }

  ngOnInit() {
    this.user = new UserDetails();
    this.message = '';
    this.cartService.cartObject.subscribe(cart => this.cart = cart);
  }
  signIn() {
    if (this.user.email == null || this.user.password == null) {
      this.message = "All fields are mandatory";
      alert(this.message);
      this.router.navigate(['./login']);
    } else {
      this.service.signInUser(this.user).subscribe(
        (success) => {
          if (success['message'] == "Email incorrect") {
            this.message = success['message'];
            this.router.navigate(['./login']);
          } else if (success['message'] == "Password incorrect") {
            this.message = success['message'];
            this.router.navigate(['./login']);
          } else {
            this.user.username = success.output['user_name'];
            this.user.email = success.output['email'];
            this.user.role = success.output['role'];
            this.loginService.changeObject(this.user);

            this.cartService.getCartFromDb(this.user).subscribe(
              (success)=>{
                console.log(success);
              },(error)=>{
                
              }
            );
            //this.router.navigate(['']);
          }
        },
        (error) => {
          this.message = error.output;
          this.router.navigate(['./login']);
        }
      );
    }
  }

}
