import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  public registerForm!:FormGroup;
  public estadoRegistro$!:Observable<boolean>;
  constructor(
    private fb:NonNullableFormBuilder,
    private authService:AuthService
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

  onSubmit = () => {
    this.authService.register(this.registerForm);
  }

}
