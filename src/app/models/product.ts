import { ProductSpecs } from "./product-specs";

export class Product {
    product_id : String;
    product_img : String;
    product_price : number;
    product_name :String;
    product_desc : String;
    product_type : String;
    product_specs:ProductSpecs;
    quantity: number;
    flag :boolean;
}
