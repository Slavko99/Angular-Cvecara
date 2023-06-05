import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(
      private _router: Router,
      public authService: AuthService,
    ){
    }
  ngOnInit(): void {
    
  }
  @ViewChild('myForm') mojaForma: NgForm;


    NavigateToSignUp(){
      this._router.navigate(['SignUp']);
    }
    onSubmit(form: NgForm){
      console.log(this.mojaForma.value.password);
      console.log(this.mojaForma.value.email)
    }
}
