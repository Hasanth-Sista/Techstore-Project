import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductSpecs } from '../models/product-specs';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-specifications',
  templateUrl: './specifications.component.html',
  styleUrls: ['./specifications.component.css']
})
export class SpecificationsComponent implements OnInit {
  product:Product;
  productSpecs:ProductSpecs;

  constructor(private searchService:SearchService,private route:Router) { }

  ngOnInit() {
    this.product=new Product();
    this.productSpecs=new ProductSpecs();
    this.searchService.currentObject.subscribe(product=>this.product = product);
  }
  getSpecs(){
    
  }

}
