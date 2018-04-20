import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { Http } from '@angular/http';
import { ProductSpecs } from '../models/product-specs';
import { ProductQuantity } from '../models/product-quantity';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  filesToUpload: File = null;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private service: SearchService, private http: Http, private router: Router) { }
  product: Array<Product>;
  message: String;
  updateProd: Product;
  addProd: Product;
  addProdSpecs:ProductSpecs;
  addQuan:ProductQuantity;
  displayQuan:Array<ProductQuantity>;
  updateQuan:ProductQuantity;
  
  imageURL: string = "assets/img";

  ngOnInit() {
    this.addProd = new Product();
    this.addProdSpecs=new ProductSpecs();
    this.addQuan = new ProductQuantity();
  }
  updateProduct(prod: Product) {
    this.updateProd = prod;
    this.updateQuan=new ProductQuantity();
    this.updateQuan.product_id=prod.product_id;
    this.updateQuan.product_quantity=prod.quantity;
    this.product = null;
    this.addProd = null;
  }
  updateProductAfter() {

    this.updateQuan.product_id=this.updateProd.product_id;
    this.updateQuan.product_quantity=this.updateProd.quantity;

    this.service.update(this.updateProd).subscribe(
      (success) => {
        alert("Product updated successfully");
      }, (error) => {
      }
    );

    this.service.updateQuan(this.updateQuan).subscribe(
      (success) => {
      }, (error) => {
      }
    );
  }
  deleteProduct(prod: Product) {
    var response = confirm("Are you sure you want to delete the product with id = " + prod.product_name + " ?");
    if (response) {
      this.service.delete(prod).subscribe(
        (success) => {
          alert(prod.product_name + " deleted successfully");
          this.router.navigate['/main'];
        }
      );
    }
  }
  addProduct() {
    if (this.addProd.product_id == null || this.addProd.product_name == null || this.addProd.product_desc == null ||
      this.addProd.product_type == null || this.addProd.product_price == null) {
      alert("Product id, Product Name, Product Desc , Product Type, Product Price are mandatory");
      this.router.navigate(['./admin']);
    } else {
      this.addProd.product_specs=this.addProdSpecs;
      this.addQuan=new ProductQuantity();
      this.addQuan.product_id=this.addProd.product_id;
      this.addQuan.product_quantity=this.addProd.quantity;

      this.http.post("http://localhost:3000/addProd", this.addProd).map((res: any) => res).subscribe(
        (success) => {
          alert("Product added successfully");
        },
        (error) => alert(error)
      );

      this.http.post("http://localhost:3000/addProdQuan", this.addQuan).map((res: any) => res).subscribe(
        (success) => {
        },
        (error) => alert(error)
      );

    }
  }
  addClearFile() {
    this.fileInput.nativeElement.value = '';
    this.addProd.product_img = null;
  }
  updateClearFile() {

    this.fileInput.nativeElement.value = '';
    this.updateProd.product_img = null;
  }
  handleFileInput(file: FileList) {
    if (FileList != null) {
      this.filesToUpload = file.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.imageURL = event.target.result;
      }
      reader.readAsDataURL(this.filesToUpload);
    }

    else {
      this.imageURL = null;
    }

  }

  addUpload() {

    this.addProd.product_img = this.imageURL;
    console.log(this.addProd.product_img);
  }
  updateUpload() {

    this.updateProd.product_img = this.imageURL;
    console.log(this.updateProd.product_img);
  }


  displayProducts() {
    this.updateProd = null;
    this.addProd = null;
    this.product = new Array<Product>();
    this.displayQuan=new Array<ProductQuantity>();
    this.service.displayAll().subscribe(
      (success) => {
        console.log(success.output);
        for (var i = 0; i < success.output.length; i++) {
          this.product.push(success.output[i]);
        }
        for (var i = 0; i < this.product.length; i++) {
          for(var j=0;j<this.displayQuan.length;j++){
            if(this.product[i].product_id==this.displayQuan[j].product_id){
              this.product[i].quantity=this.displayQuan[j].product_quantity;
            }
          }
        }

      },
      (error) => {

      }
    );

    this.service.displayQuantity().subscribe(
      (success)=>{
        for (var i = 0; i < success.output.length; i++) {
          this.displayQuan.push(success.output[i]);
        }
      }
    );
  }
}
