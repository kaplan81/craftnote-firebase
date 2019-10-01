import { Component, NgZone } from '@angular/core';
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
  loggedIn = false;
  user: User;

  constructor(
    private angularFireAuth: AngularFireAuth,
    public dialog: MatDialog,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.angularFireAuth.auth.onAuthStateChanged((user: User) => {
      console.log('Authentication State Changed!:::');

      if (user) {
        this.loggedIn = true;
        this.user = user;
        this.ngZone.run(() => {
          if (this.router.url === '/login' || this.router.url === '/register') {
            this.router.navigate(['features']);
          }
        });
      } else {
        this.ngZone.run(() => {
          this.router.navigate(['']).then(() => {
            if (!this.loggedIn) {
              const dialogRef = this.dialog.open(AuthDialogComponent, {
                width: '400px'
              });

              dialogRef
                .afterClosed()
                .pipe(take(1))
                .subscribe((authAction: 'login' | 'register') => {
                  this.router.navigate([authAction]);
                });
            }
          });
        });
      }
    });
  }

  onLoggedOut(): void {
    this.loggedIn = false;
  }
}
