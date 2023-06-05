import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  CategoryId: string = '';
  currentCategory :any[] = [];
  

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _productService: ProductService,
  ) { }

  ngOnInit(): void {
    // debugger
    this.CategoryId = this._route.snapshot.params['CategoryId'];
    this.routeChanged();

    this._route.params.subscribe({
      next: (data:any) => {
        this.CategoryId = data.CategoryId;
        this.routeChanged();
      },
      error: (err) => console.log(err)
    });
  }
  routeChanged(){
    this.currentCategory = this._productService.GetProductByCategoryId(this.CategoryId);
  }

  navigateToProduct(prodId: number){
    this._router.navigate(['/product', prodId]);
  }
}
