import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(
    private _router: Router,
    public authService: AuthService,
  ){
  }
ngOnInit(): void {
  
}
  NavigateToLogIn(){
    this._router.navigate(['Login']);
  }
  onSubmit(form: NgForm){
    console.log(form);
  }
  NavigateToLogin(){
    this._router.navigate(['Login']);
  }
}
