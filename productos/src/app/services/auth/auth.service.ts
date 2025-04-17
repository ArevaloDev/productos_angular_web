import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PostRegister, RegisterRequest } from '../../interfaces/register.interface';
import { LoginRequest, LoginResponse, PostLogin } from '../../interfaces/login.interface';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api:string = environment.apiUrl;


  constructor(
    private http:HttpClient
  ) { }

  register = (formRegister:RegisterRequest) => {
    const {name, email, password} = formRegister;
    const register:PostRegister = {
      nombre: name,
      correo: email,
      password: password
    }
    console.log(register);
    return this.http.post<RegisterRequest>(`${this.api}/registro`, register).pipe(
      catchError((error:HttpErrorResponse) => this.handleError(error))
    )
  }



  login = (loginForm:LoginRequest) => {
    const {email, password} = loginForm;
    const login:PostLogin = {
      correo: email,
      password: password
    }
    return this.http.post<LoginResponse>(`${this.api}/login`, login).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.handleError(error)
      } )
    )
  }

  private handleError(error:HttpErrorResponse){
    let messageError = 'Ocurrió un error inesperado';
    if(error.status === 404){
      messageError = 'El recurso no fue encontrado (404)';
    }else if(error.status === 500 ){
      messageError = 'Error en el servidor (500)';
    }
    return throwError(() => new Error(messageError))
  }

  setLocalUser = (user:any) => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getLocalUser = () => {
    const data = localStorage.getItem('user')!;
    const user = JSON.parse(data);
    return user;
  }


}
