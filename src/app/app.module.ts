import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './containers/app.component';
import { githubReducer } from './reducers/github.reducer';
import { MultiplyPipe } from './pipes/multiply.pipe';
import { CustomMatPaginatorIntl } from './providers/custon-mat-paginator-intl';
import { GithubEffects } from './effects/github.effects';

@NgModule({
  declarations: [
    AppComponent,
    MultiplyPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({ state: githubReducer }),
    EffectsModule.forRoot([GithubEffects]),
  ],
  providers: [{provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}],
  bootstrap: [AppComponent]
})
export class AppModule { }
