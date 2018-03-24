import { Component, OnInit } from '@angular/core';
import { Search } from '../models/search';
import { SearchService } from '../services/search.service';
import { Product } from '../models/product';
import { AppModule } from '../app.module';
import{AppRoutingModule} from '../app.routing';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  search: Search;
  product : Product;

  constructor(private searchService: SearchService,  private router: Router) { }

  ngOnInit() {
    this.search = new Search();
    this.searchService.currentObject.subscribe(product=>this.product=product);
  }

  searchClick() {
    if (this.search.searchElement.length == 0)
      location.reload();
    else
      this.searchService.searchResult(this.search.searchElement).subscribe(
        (success)=>{
          console.log(success);
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
  signUpClick(){
    this.router.navigate(['./signup']);
 
  }

}
