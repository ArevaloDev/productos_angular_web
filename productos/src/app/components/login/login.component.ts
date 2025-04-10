import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { ToastService } from '../../services/toast/toast.service';
import { catchError, finalize, firstValueFrom, of, tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private spinnerService:SpinnerService,
    private toastService:ToastService

  ){}

  ngOnInit(): void {
      this.createLoginForm()
  }

  get formControls(){
    return this.loginForm.controls;
  }

  createLoginForm = () => {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmitLogin = async() => {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return
    }
    this.spinnerService.showSpinner();
    try {
      const response = await firstValueFrom(
        this.authService.login(this.loginForm.value)
      )
      if(response.estado !== 'ok') {
        this.toastService.show('Credenciales incorrectas', 'danger', 5000);
        return;
      }
      this.router.navigate(['/home']);
    } catch (error:any) {
      console.log('errrooor', error);

      if(error.message === 'El recurso no fue encontrado (404)'){
        this.toastService.show('Error al iniciar sesión, credenciales invalidas', 'danger', 5000);
        return
      }
      this.toastService.show('Error al iniciar sesión', 'danger', 5000);
      this.spinnerService.hideSpinner();
    }finally{
      this.spinnerService.hideSpinner();
    }
}

}
