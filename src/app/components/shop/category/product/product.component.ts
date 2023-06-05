import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/shoppingCart';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    
  currentProductId: number;
  currentProduct: any = '';
  cart: Product[] = [];

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _productService: ProductService,
    public authService: AuthService,
  ){}

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (data:any) => {
        this.currentProductId = data.id;
        this.getProductById();
      },
      error: (err) => console.log(err)
    });
  }
  getProductById(){
    this.currentProduct = this._productService.getProductById(this.currentProductId);
  }

  goPrev(Index: number){
      this._router.navigate(['/product', Index-1]);
  }
  goNext(Index: number){
      this._router.navigate(['/product', Index+1]);
  }
  @ViewChild('myForm') mojaForma: NgForm;


  AddToShoppingCart(id: number){
    if(this.authService.isLoggedIn && this.mojaForma.value.quantity>0){
       let korpa: Product = {
      id: this.currentProductId,
      name: this.currentProduct.name,
      imgSrc: this.currentProduct.putanja,
      price: this.currentProduct.price,
      quantity: this.mojaForma.value.quantity,
      tPrice: this.currentProduct.price * this.mojaForma.value.quantity
    };
    this._productService.storeProduct(korpa)
    .subscribe({
      next: (data) => {
        this._productService.cart.push(korpa);
        this.getProducts()
      },
      error: (error)=> {console.log(error)}
      
    })
    this.mojaForma.reset();
    }
     
  }

  reset(){
    this.mojaForma.reset();
  }

  getProducts() {
    this._productService.getProducts()
      .subscribe({
        next: (data) => {
          this.cart = data as Product[];
          console.log(this.cart);
        },
        error: (error) => {
          console.log(error);
        }
      })
  }
  NavigateToLogin(){
    this._router.navigate(['Login']);
  }
}
