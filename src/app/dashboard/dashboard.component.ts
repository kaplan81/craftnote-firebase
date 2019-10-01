import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
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
  featureForm = this.fb.group({
    name: ['', Validators.required],
    importance: [null, Validators.required],
    quantity: [null, Validators.required]
  });

  constructor(
    private angularFirestore: AngularFirestore,
    private fb: FormBuilder
  ) {
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

  onSubmit(): void {
    this.angularFirestore
      .collection<Feature>('Feature')
      .add({
        featureName: this.featureForm.value.name,
        importance: this.featureForm.value.importance,
        quantity: this.featureForm.value.quantity
      })
      .then(() => {
        console.log('A  new feature was added to the database.');
        this.featureForm.reset();
      })
      .catch(error => alert(error.message));
  }
}
