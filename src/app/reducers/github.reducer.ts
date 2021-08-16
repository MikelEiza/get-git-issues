import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import * as githubActions from '../actions/github.actions';
import { Page } from '../models/github.model';

export const stateKey = 'state';

export const initialState: Page = {
  totalPages: 0,
  issuePageUrl: 'a',
  issues: [],
};

export const selectState = createFeatureSelector<Page>(
  stateKey
);

export const selectTotalPages = createSelector(
  selectState,
  (state: Page) => state.totalPages
);

export const selectIssuePageUrl = createSelector(
  selectState,
  (state: Page) => state.issuePageUrl
);

export const selectIssues = createSelector(
  selectState,
  (state: Page) => state.issues
);

const _githubReducer = createReducer(
  initialState,
  on(githubActions.loadPage, (state, action) => ({
    ...state,
    totalPages: action.totalPages ? action.totalPages : state.totalPages,
    issuePageUrl: action.issuePageUrl != "" ? action.issuePageUrl : state.issuePageUrl,
    issues: action.issues,
  })),
  on(githubActions.cleanPage, (state) => ({
    ...state,
    totalPages: 0,
    issuePageUrl: "",
    issues: [],
  })),
);

export function githubReducer(state: any, action: any) {
  return _githubReducer(state, action);
}
