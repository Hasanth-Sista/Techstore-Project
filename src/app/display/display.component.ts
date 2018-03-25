import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Product } from '../models/product';
import { } from "@bootstrap";

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})

export class DisplayComponent implements OnInit {
  product : Product;
  constructor(private searchService : SearchService) { }

  ngOnInit() {
    this.searchService.currentObject.subscribe(product=>this.product = product);
  }

}
