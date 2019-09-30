import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';

@Component({
  selector: 'crf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showDialog = true;
  constructor(
    private angularFireAuth: AngularFireAuth,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.angularFireAuth.auth.onAuthStateChanged((user: any) => {
      if (user) {
        this.showDialog = false;
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const providerData = user.providerData;
        console.log('displayName:::', displayName);
        console.log('email:::', email);
        console.log('emailVerified:::', emailVerified);
        console.log('photoURL:::', photoURL);
        console.log('isAnonymous:::', isAnonymous);
        console.log('uid:::', uid);
        console.log('providerData:::', providerData);
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
