import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  showSpinner = () => {
      this.loading.next(true);
  }

  hideSpinner = () => {
    this.loading.next(false);
  }
}
