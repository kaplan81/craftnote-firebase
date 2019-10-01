import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs';
import { map, share, takeUntil, tap } from 'rxjs/operators';
import { Feedback, FeedbackRow } from '../feedback.model';
import { FeedbackDataSource } from './feedback-datasource';

@Component({
  selector: 'crf-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<FeedbackRow>;
  dataSource: FeedbackDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'description', 'channel'];
  feedbackForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    channel: ['', Validators.required]
  });
  destroyed$ = new Subject<boolean>();

  constructor(
    private angularFirestore: AngularFirestore,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.angularFirestore
      .collection<Feedback>('Feedback')
      .snapshotChanges()
      .pipe(
        map(val => val.map(v => v.payload.doc.data())),
        map((feeds: Feedback[]) =>
          feeds.map(
            (feed: Feedback): FeedbackRow => {
              return {
                featureName: feed.featureName,
                description: feed.description,
                channel: feed.channel
              };
            }
          )
        ),
        tap((rows: FeedbackRow[]) => {
          this.dataSource = new FeedbackDataSource(rows);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;
        }),
        takeUntil(this.destroyed$),
        share()
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onSubmit(): void {
    const featureName: string[] = this.splitNames(this.feedbackForm.value.name);
    const description: string = this.feedbackForm.value.description;
    const channel: string = this.feedbackForm.value.channel;

    this.angularFirestore
      .collection<FeedbackRow>('Feedback')
      .add({ featureName, description, channel })
      .then(() => {
        console.log('A  new feedback was added to the database.');
        this.feedbackForm.reset();
      })
      .catch(error => alert(error.message));
  }

  private splitNames(names: string): string[] {
    return names
      .trim()
      .split(',')
      .map(str => str.trim());
  }
}
