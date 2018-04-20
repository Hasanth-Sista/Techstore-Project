import { Component, OnInit } from '@angular/core';
import { Search } from '../models/search';
import { SearchService } from '../services/search.service';
import { Product } from '../models/product';
import { AppModule } from '../app.module';
import { AppRoutingModule } from '../app.routing';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { UserDetails } from '../models/user-details';
import { LoginService } from '../services/login.service';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search: Search;
  product: Product;
  user: UserDetails;
  cart: Cart;

  constructor(private cartService: CartService, private searchService: SearchService, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.search = new Search();
    this.user = new UserDetails();

    this.searchService.currentObject.subscribe(product => this.product = product);
    this.loginService.userObject.subscribe(user => this.user = user);
    this.cartService.cartObject.subscribe(cart => this.cart = cart);
  }

  searchClick() {
    if (this.search.searchElement.length == 0)
      location.reload();
    else
      this.searchService.searchResult(this.search.searchElement).subscribe(
        (success) => {
          if (success.output.length > 0) {
            console.log(success);
            this.search.searchElement = null;
            this.product = success.output;
            this.searchService.changeObject(this.product);
            this.router.navigate(['./display']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  loginClick() {
    this.router.navigate(['./login']);
  }
  logoutClick() {
    this.cartService.zeroCart();
  }
  signUpClick() {
    this.router.navigate(['./signup']);
  }


}
