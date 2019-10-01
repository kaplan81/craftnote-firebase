import { Component, Input, OnChanges } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'crf-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnChanges {
  @Input() loggedIn: boolean;

  constructor(private angularFireAuth: AngularFireAuth) {}

  ngOnChanges(): void {
    console.log('this.loggedIn:::', this.loggedIn);
  }

  logout(): void {
    this.angularFireAuth.auth.signOut();
  }
}
