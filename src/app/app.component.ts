import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'crf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.auth.onAuthStateChanged((user: any) => {
      if (user) {
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
        // Navigate to registration.
        console.log('We are not authenticated');
      }
    });
  }
}
