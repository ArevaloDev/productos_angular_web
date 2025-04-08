import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastComponent } from '../../shared/toast/toast/toast.component';
import { FormBuilder, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService = jasmine.createSpyObj('AuthService', ['register'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent, ToastComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        NonNullableFormBuilder,
        FormBuilder,
        {provide: AuthService, useValue:mockAuthService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('deberia inicializar el formulario con 3 campos', () => {
    expect(component.registerForm.contains('name')).toBeTrue();
    expect(component.registerForm.contains('email')).toBeTrue();
    expect(component.registerForm.contains('password')).toBeTrue();
  });

  it('Deberia marcar campo "name" como invalido si esta vacio',  () => {
    const control = component.registerForm.get('name');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('Deberia marcar el campo "email" como invalido si esta vacio', () => {
    const control = component.registerForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });
  it('Deberia marcar el campo "password" como invalido si esta vacio', () => {
    const control = component.registerForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalse();
  });

  it('Deberia llamar a authService.register() al hacer submit',  () => {
    component.registerForm.setValue({
      name: 'Juan',
      email: 'juan@gmail.com',
      password: '12345678'
    });

    component.onSubmit();
    expect(mockAuthService.register).toHaveBeenCalledWith(component.registerForm);
  })

});
