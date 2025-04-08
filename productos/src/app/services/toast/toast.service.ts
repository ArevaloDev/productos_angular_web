import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Toast } from '../../interfaces/toast.interface';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<Toast>();
  toastState$ = this.toastSubject.asObservable();
  constructor() { }

  show = (text:string, type:Toast['type'] = 'info', delay = 300) => {
    this.toastSubject.next({text, type, delay});
  }
}
