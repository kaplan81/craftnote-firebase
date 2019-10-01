import { Component, Input } from '@angular/core';

@Component({
  selector: 'crf-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() loggedIn: boolean;
}
