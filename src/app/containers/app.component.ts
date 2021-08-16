import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Issue, Page } from '../models/github.model';
import { GithubService } from '../services/github.service';
import * as githubActions from '../actions/github.actions';
import * as fromState from '../reducers/github.reducer';
import { PageEvent } from '@angular/material/paginator';
import { FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
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

  issues$: Observable<Issue[]>;
  totalPages$: Observable<number>;
  issuePageUrl$: Observable<string>;

  inputValue: string = "";
  displayedColumns: string[] = ['id', 'title', 'state', 'url'];
  pageSizeOptions: number[] = [5, 10, 20, 50];
  showFirstLastButtons: boolean = true;
  pageSize: number = 10;

  constructor(private store: Store<{ state: Page }>,
    private githubService: GithubService) {
    this.issues$ = store.select(fromState.selectIssues);
    this.totalPages$ = store.select(fromState.selectTotalPages);
    this.issuePageUrl$ = store.select(fromState.selectIssuePageUrl);
  }

  loadIssues(url: string) {
    this.githubService.getNewIssuesPageFromRepository(url, this.pageSize).subscribe({
      next: (page: Page) => this.store.dispatch(githubActions.loadPage(page)),
      error: () => this.store.dispatch(githubActions.cleanPage())
    })
  }

  handlePageEvent(event: PageEvent) {
    this.pageSize = event.pageSize
    this.issuePageUrl$.pipe(take(1)).subscribe({
      next: (issuePageUrl) => this.store.dispatch(githubActions.paginate({url: issuePageUrl, pageEvent: event}))
    })
  }

  onSubmit (isInputValid: boolean, event: Event) {
    if (isInputValid) {
      this.loadIssues(this.inputValue)
    }
    event.preventDefault();
  }

}
