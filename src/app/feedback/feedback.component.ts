import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
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
}
