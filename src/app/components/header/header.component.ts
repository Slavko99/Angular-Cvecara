import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    nekiBroj=0;
    constructor(
      private _router: Router,
      private _route: ActivatedRoute,
      private _servis: ProductService,
      public authService: AuthService,
    ){}
  ngOnInit() {
    this._servis.nekibroj.subscribe({
      next: (data: number) => {
        this.nekiBroj = data;
      }
    })
  }

    NavigateToLogin(){
      this._router.navigate(['Login']);
    }
    NavigateToShoppingCart(){
      this._router.navigate(['ShoppingCart']);
    }
    SignOut(){
      this.authService.signOut();
    }
}
