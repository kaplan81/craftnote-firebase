import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { User } from './user.model';

@Component({
  selector: 'crf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showDialog = true;
  user: User;

  constructor(
    private angularFireAuth: AngularFireAuth,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.angularFireAuth.auth.onAuthStateChanged((user: User) => {
      if (user) {
        this.showDialog = false;
        this.user = user;
      } else {
        this.router.navigate(['']).then(() => {
          if (this.showDialog) {
            const dialogRef = this.dialog.open(AuthDialogComponent, {
              width: '350px'
            });

            dialogRef
              .afterClosed()
              .pipe(take(1))
              .subscribe((authAction: 'login' | 'register') => {
                this.showDialog = false;
                this.router.navigate([authAction]);
              });
          }
        });
      }
    });
  }
}
