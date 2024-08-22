import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  toastMessages: { message: string, type: string }[] = [];

  show(message: string, type: string = 'success') {
    this.toastMessages.push({ message, type });
    setTimeout(() => this.dismiss(), 3000); // Auto-dismiss after 3 seconds
  }

  // dismiss() {
  //   this.toastMessages.shift();
  // }

  dismiss(toastToDismiss?: { type: string; message: string }) {
    if (toastToDismiss) {
      this.toastMessages = this.toastMessages.filter(toast => toast !== toastToDismiss);
    } else {
      this.toastMessages.shift(); 
    }
  }
}
