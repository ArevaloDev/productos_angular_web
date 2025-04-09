import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { PostRegister, RegisterRequest } from '../../interfaces/register.interface';
import { FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import {  finalize, tap } from 'rxjs';
import { ToastService } from '../toast/toast.service';
import { SpinnerService } from '../spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api:string = environment.apiUrl;


  constructor(
    private http:HttpClient,
    private router:Router,
    private toastService:ToastService,
    private spinnerService:SpinnerService
  ) { }

  register = (formRegister:FormGroup) => {
    if(formRegister.invalid){
      formRegister.markAllAsTouched();
      return;
    }
    const register:PostRegister = {
      nombre: formRegister.get('name')?.value,
      correo: formRegister.get('email')?.value,
      password: formRegister.get('password')?.value
    }
    this.RegisterPost(register, formRegister)
  }

  RegisterPost = (register:PostRegister, formRegister:FormGroup) => {
    return this.http.post<RegisterRequest>(`${this.api}/registro`, register).pipe(
      tap(response => {
        if(response.estado === 'repetido'){
          this.toastService.show('Usuario ya se encuentra registrado', 'danger', 5000);
          formRegister.reset();
          return;
        }
        this.toastService.show('Usuario registrado con exito', 'success', 5000);
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000)
        formRegister.reset();
      }),
      finalize(() => {
        this.spinnerService.showSpinner();
      })
    )
    .subscribe();
  }


}
