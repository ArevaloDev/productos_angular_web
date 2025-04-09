import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../../services/spinner/spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent implements OnInit{
  public loading$!:Observable<boolean>
    constructor(private spinnerService:SpinnerService){}
    ngOnInit(): void {
        this.loading$ = this.spinnerService.loading$;
    }

}
