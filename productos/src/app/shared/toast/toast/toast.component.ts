import { Component, OnDestroy, OnInit } from '@angular/core';
import { Toast } from '../../../interfaces/toast.interface';
import { Subscription, timer } from 'rxjs';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit, OnDestroy {
   toasts:Toast[] = [];
   sub!:Subscription;
   constructor(private toastService:ToastService){}

   ngOnInit(): void {
    this.sub = this.toastService.toastState$.subscribe(toast => {
      this.toasts.push(toast);
      timer(toast.delay ?? 3000).subscribe(() => {
        this.toasts.shift();
      })
    })
   }

   ngOnDestroy(): void {
     this.sub.unsubscribe();
   }
}
