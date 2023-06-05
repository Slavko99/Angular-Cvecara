import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/shoppingCart';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit{

  signUpForm: FormGroup
  products: Product[] = [];
  constructor(
    private _productService: ProductService,
    private router: Router,
  ){
    
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'fname': new FormControl(null, Validators.required),
      'lname': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'comment': new FormControl(null),
      'payment': new FormControl("creditcard", Validators.required),
    })
  }
  onSubmit(){
  
    this.deleteAll()
    this.router.navigate([''])
    
  }
  deleteAll(){
    this._productService.cart.forEach(product => {
      this._productService.deleteProduct(product.id).subscribe({
        next: (data) => {
          this.getProducts();
          console.log(this.products);
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
  }
  getProducts() {
    this._productService.getProducts()
      .subscribe({
        next: (data) => {
          this.products = data as Product[];
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

}
