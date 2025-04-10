import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import {firstValueFrom} from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';
import { Router } from '@angular/router';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  public registerForm!:FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthService,
    private toastService:ToastService,
    private router:Router,
    private spinnerService:SpinnerService
  ){}

  ngOnInit(): void {
    this.generateForm();
  }

  private generateForm = () => {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  get formControls(){
    return this.registerForm.controls;
  }

  onSubmit = async() => {
    if(this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.spinnerService.showSpinner();
    try {
      const response = await firstValueFrom(
        this.authService.register(this.registerForm.value)
      );

      if(response.estado === 'repetido'){
        this.toastService.show('Usuario ya se encuentra registrado', 'danger', 5000);
        this.registerForm.reset();
        return;
      }
      this.toastService.show('Usuario registrado con éxito', 'success', 5000);
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000)
    } catch (error) {
      this.toastService.show('Error al registrarse', 'danger', 5000);
      this.spinnerService.hideSpinner();
    } finally{
      this.spinnerService.hideSpinner();
    }


}

}


