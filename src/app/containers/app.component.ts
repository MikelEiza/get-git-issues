import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as githubActions from '../actions/github.actions';
import { Issue, Page } from '../models/github.model';
import * as fromState from '../reducers/github.reducer';
import { MyErrorStateMatcher, repositoryValidator } from '../utils/form-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  inputFormControl = new FormControl('', [
    Validators.required,
    repositoryValidator,
  ]);
  matcher = new MyErrorStateMatcher();

  issues$: Observable<Issue[]> = this.store.select(fromState.selectIssues);
  totalPages$: Observable<number> = this.store.select(fromState.selectTotalPages);
  issuePageUrl$: Observable<string> = this.store.select(fromState.selectIssuePageUrl);

  inputValue: string = "";
  displayedColumns: string[] = ['id', 'title', 'state', 'url'];
  pageSizeOptions: number[] = [5, 10, 20, 50];
  showFirstLastButtons: boolean = true;
  pageSize: number = 10;

  constructor(
    private store: Store<{ state: Page }>,
  ) { }

  loadIssues(url: string) {
    this.store.dispatch(githubActions.initRepo({url, pageSize: this.pageSize}));
  }

  handlePageEvent(event: PageEvent, issuePageUrl: string) {
    this.pageSize = event.pageSize;
    this.store.dispatch(githubActions.paginate({url: issuePageUrl, pageEvent: event}));
  }

  onSubmit (isInputValid: boolean, event: Event) {
    if (isInputValid) {
      this.loadIssues(this.inputValue)
    }
    event.preventDefault();
  }

}
