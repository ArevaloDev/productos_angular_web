import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  public registerForm!:FormGroup;
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
    console.log(this.registerForm.value);


  }

}
