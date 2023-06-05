import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Product } from 'src/app/models/shoppingCart';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: Product[] = [];
  sum: number = 0;
  shipping: any;
  total: any;
  shippingF: string = "FREE";
  shippingN: number = 100;


  constructor(
    private _productService: ProductService,
    private _router: Router,


  ) {

  }
  ngOnInit(): void {
    this.getProducts()
    
  }

  getProducts() {
    this._productService.getProducts()
      .subscribe({
        next: (data) => {
          this.cart = data as Product[];
          console.log(this.cart);
          this.totalSum();
          this.brojSePromenio();
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  deleteProduct(product: Product) {
    this._productService.deleteProduct(product.id).subscribe({
      next: (data) => {
        this.getProducts()
        this.deleteSum()
      }
    })
  }
  totalSum(){
    this.cart.forEach(element => {
      this.sum += element.tPrice;
      this.shipping = this.sum >= 100 ? this.shippingF : this.shippingN;
      this.total = this.sum < 100 ? this.sum + this.shipping : this.sum;
    });
  }
  deleteSum(){
    this.cart.forEach(element=>{
      this.sum -= element.tPrice;
    })
  }

  navigateToProductOrder() {
    this._router.navigate(['ProductOrder']);
  }

  brojSePromenio(){
    let vrednost = this.cart.length;
    console.log(vrednost);
    this._productService.nekibroj.next(vrednost);
  }




}




