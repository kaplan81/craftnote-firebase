import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'crf-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() loggedIn: boolean;
  @Output() loggedOut = new EventEmitter<void>();

  constructor(private angularFireAuth: AngularFireAuth) {}

  logout(): void {
    this.angularFireAuth.auth.signOut().then(() => {
      this.loggedOut.emit();
    });
  }
}
