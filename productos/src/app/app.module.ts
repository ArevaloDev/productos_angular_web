import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RestrictedAccessComponent } from './shared/restricted-access/restricted-access.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import {  ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './shared/toast/toast/toast.component';
import { SpinnerComponent } from './shared/spinner/spinner/spinner.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { authInterceptor } from './services/intercept/auth.interceptor';
import { CreateCategoryComponent } from './components/products/create-category/create-category.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductsComponent,
    HomeComponent,
    RegisterComponent,
    RestrictedAccessComponent,
    NotFoundComponent,
    ToastComponent,
    SpinnerComponent,
    NavbarComponent,
    CreateCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient(
    withInterceptors([authInterceptor])
  )],
  bootstrap: [AppComponent]
})
export class AppModule { }
