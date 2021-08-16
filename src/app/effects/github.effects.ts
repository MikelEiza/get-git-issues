import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as githubActions from '../actions/github.actions';
import { Page } from '../models/github.model';
import { GithubService } from '../services/github.service';

@Injectable()
export class GithubEffects {
  initRepo$ = createEffect(() => this.actions$.pipe(
    ofType(githubActions.initRepo),
    switchMap(({url, pageSize}) => this.githubService.getNewIssuesPageFromRepository(url, pageSize)),
    map((page: Page) => githubActions.loadPage(page))
  ));

  getIssuePage$ = createEffect(() => this.actions$.pipe(
    ofType(githubActions.paginate),
    switchMap((action) => this.githubService.getIssuesPage(action.url, action.pageEvent.pageSize, action.pageEvent.pageIndex + 1)),
    map((page: Page) => githubActions.loadPage(page))
  ));

  constructor(
    private actions$: Actions,
    private githubService: GithubService
  ) {}
}
