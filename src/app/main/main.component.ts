import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../app.routing';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { SearchService } from '../services/search.service';
import { Search } from '../models/search';
import { Product } from '../models/product';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  search: Search;
  product: Product;

  constructor(private searchService: SearchService, private router: Router) { }

  ngOnInit() {
    this.search = new Search();
    this.searchService.currentObject.subscribe(product => this.product = product);
  }
  goToTabletsPage(s: String) {
    this.search.searchElement = s;
    this.searchService.searchResult(this.search.searchElement).subscribe(
      (success) => {
        console.log(success);
        this.product = success.output;
        this.searchService.changeObject(this.product);
        this.router.navigate(['./display']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
