import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products/products.service';
import { ToastService } from '../../../services/toast/toast.service';
import { SpinnerService } from '../../../services/spinner/spinner.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css'
})
export class CreateCategoryComponent implements OnInit {

  public formCategory!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private productServices:ProductsService,
    private toastService:ToastService,
    private spinnerService:SpinnerService

  ){}

  ngOnInit(): void {
    this.formCategory = this.fb.group({
      nombre: ['', Validators.required]
    });

  }

  get formControls(){
    return this.formCategory.controls
  }

  createCategory = () => {
    if(this.formCategory.invalid) {
      this.formCategory.markAllAsTouched();
      return;
    };
    this.spinnerService.showSpinner();
    this.productServices.createCategory(this.formCategory.value).subscribe(response => {
      if(response.estado != 'ok'){
        this.toastService.show('Error al crear categoria, categoria ya creada', 'danger', 5000);
        return;
      }

      this.toastService.show(`${response.mensaje}`, 'success', 5000);
      this.spinnerService.hideSpinner();
      this.formCategory.reset();

    },(err) => {
      this.toastService.show('Error al crear categoria, categoria ya creada', 'danger', 5000);
      this.spinnerService.hideSpinner();
    })

  }



}
