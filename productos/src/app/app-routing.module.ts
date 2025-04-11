import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'products', component:ProductsComponent, canActivate:[authGuard]},
  {path: 'register', component:RegisterComponent},
  {path: 'home', component:HomeComponent, canActivate:[authGuard]},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
