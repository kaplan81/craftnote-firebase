import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { Feature } from '../feature.model';

@Component({
  selector: 'crf-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  features$: Observable<Feature[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.features$ = this.angularFirestore
      .collection<Feature>('Feature')
      .snapshotChanges()
      .pipe(
        map(val => val.map(v => v.payload.doc.data())),
        map((feats: Feature[]) =>
          feats.sort((a, b) => {
            if (a.quantity < b.quantity) {
              return 1;
            }
            if (a.quantity > b.quantity) {
              return -1;
            }
            return 0;
          })
        ),
        share()
      );
  }
}
