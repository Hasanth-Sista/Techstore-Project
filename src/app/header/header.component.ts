import { Component, OnInit } from '@angular/core';
import { Search } from '../models/search';
import { SearchService } from '../services/search.service';
import { Product } from '../models/product';
import { AppModule } from '../app.module';
import{AppRoutingModule} from '../app.routing';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { UserDetails } from '../models/user-details';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search: Search;
  product : Product;
  user: UserDetails;

  constructor(private searchService: SearchService,  private router: Router,private loginService:LoginService) { }

  ngOnInit() {
    this.search = new Search();
    this.user=new UserDetails();
    
    this.searchService.currentObject.subscribe(product=>this.product=product);
    this.loginService.userObject.subscribe(user=>this.user=user);
  }

  searchClick() {
    if (this.search.searchElement.length == 0)
      location.reload();
    else
      this.searchService.searchResult(this.search.searchElement).subscribe(
        (success)=>{
          console.log(success);
          this.search.searchElement=null;
          this.product=success.output;
          this.searchService.changeObject(this.product);
          this.router.navigate(['./display']);
        },
        (error)=>{
          console.log(error);
        }
      );
  }
  loginClick(){
    this.router.navigate(['./login']);
  }
  logoutClick(){
    this.loginService.changeObject(null);
    this.router.navigate(['']);
  }
  signUpClick(){
    this.router.navigate(['./signup']);
  }

}
