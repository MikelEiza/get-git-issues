import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { GithubService } from '../services/github.service';
import * as githubActions from '../actions/github.actions';
import { Page } from '../models/github.model';
 
@Injectable()
export class GithubEffects {
 
  getIssuePage$ = createEffect(() => this.actions$.pipe(
    ofType(githubActions.paginate),
    mergeMap((action) => this.githubService.getIssuesPage(action.url, action.pageEvent.pageSize, action.pageEvent.pageIndex + 1)
      .pipe(
        map((page: Page) => githubActions.loadPage(page))
      ))
    )
  );
 
  constructor(
    private actions$: Actions,
    private githubService: GithubService
  ) {}
}