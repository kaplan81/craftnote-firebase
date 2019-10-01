import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, Observable, of as observableOf } from 'rxjs';
import { map } from 'rxjs/operators';
import { FeedbackRow } from '../feedback.model';

/**
 * Data source for the Feedback view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FeedbackDataSource extends DataSource<FeedbackRow> {
  data: FeedbackRow[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(data: FeedbackRow[]) {
    super();
    this.data = this.formatData(data);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<FeedbackRow[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: FeedbackRow[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: FeedbackRow[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name':
          return compare(a.featureName, b.featureName, isAsc);
        case 'id':
          return compare(+a.description, +b.channel, isAsc);
        case 'name':
          return compare(a.channel, b.channel, isAsc);
        default:
          return 0;
      }
    });
  }

  // Format data since there can be several feature names.
  private formatData(data: FeedbackRow[]): FeedbackRow[] {
    return data.map((row: FeedbackRow) => {
      const names: string =
        row.featureName !== null
          ? (row.featureName as string[]).join(', ')
          : '';

      return {
        ...row,
        featureName: names
      };
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
