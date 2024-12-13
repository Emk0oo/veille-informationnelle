// src/app/shared/toast.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error';
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private initialState: ToastMessage = {
    message: '',
    type: 'success',
    show: false
  };

  private toastState = new BehaviorSubject<ToastMessage>(this.initialState);
  toast$ = this.toastState.asObservable();

  showToast(message: string, type: 'success' | 'error'): void {
    this.toastState.next({ message, type, show: true });
    setTimeout(() => {
      this.hideToast();
    }, 3000); // Cache le toast après 3 secondes
  }

  hideToast(): void {
    this.toastState.next({ ...this.initialState });
  }
}