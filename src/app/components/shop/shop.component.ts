import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{

  category :any[] = []

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _productService: ProductService,
  ){}

  ngOnInit(): void {
    this.category = this._productService.category;
  }
  selectCategory(id: string){
    this._router.navigate(['/shop', id]);
  }
}
