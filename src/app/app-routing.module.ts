import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CategoryComponent } from './components/shop/category/category.component';
import { ProductComponent } from './components/shop/category/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductOrderComponent } from './components/product-order/product-order.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'shop', component: ShopComponent, children: [
    { path: ':CategoryId', component: CategoryComponent } 
  ]},
  {path: 'product/:id', component: ProductComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'SignUp', component: SignupComponent},
  {path: 'ShoppingCart', component: ShoppingCartComponent, canActivate: [AuthGuard]},
  {path: 'ProductOrder', component: ProductOrderComponent},

  { path: 'about', component: AboutComponent},
  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
