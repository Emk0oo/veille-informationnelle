import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './toast.component.html',
  animations: [
    trigger('toastAnimation', [
      state('void', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => visible', [
        animate('300ms ease-out')
      ]),
      transition('visible => void', [
        animate('200ms ease-in')
      ])
    ])
  ],
  styles: [`
    @keyframes progress {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }
    
    .animate-progress {
      animation: progress 3s linear forwards;
    }
  `]
})
export class ToastComponent {
  private toastService = inject(ToastService);
  toast$ = this.toastService.toast$;

  closeToast(): void {
    this.toastService.hideToast();
  }
}