import { PageEvent } from '@angular/material/paginator';
import { createAction, props } from '@ngrx/store';
import { Page } from '../models/github.model';

export const initRepo = createAction(
  '[GitHub] Init repo',
  props<{url: string, pageSize: number}>()
);

export const loadPage = createAction(
    '[GitHub] Load page',
    props<Page>()
);

export const cleanPage = createAction(
    '[GitHub] Clean page',
);

export const paginate = createAction(
    '[GitHub] Paginate',
    props<{url: string, pageEvent: PageEvent}>()
);
