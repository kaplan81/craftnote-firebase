import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'crf-auth-dialog',
  templateUrl: './auth-dialog.component.html'
})
export class AuthDialogComponent {
  constructor(public dialogRef: MatDialogRef<AuthDialogComponent>) {}

  closeDialog(authAction: 'login' | 'register'): void {
    this.dialogRef.close(authAction);
  }
}
