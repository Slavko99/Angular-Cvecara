import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ){}

  navigateToShop(){
    this._router.navigate(['shop'], {relativeTo: this._route});
  }
}
