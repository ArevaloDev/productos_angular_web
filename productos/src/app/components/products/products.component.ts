import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Observable } from 'rxjs';
import { Products } from '../../interfaces/products.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  public product$!:Observable<Products[]>;
  constructor(private productService:ProductsService){}

  ngOnInit(): void {
   this.product$ = this.productService.getProducts();
  }
}
