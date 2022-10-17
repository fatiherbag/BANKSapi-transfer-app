import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule,MAT_DATE_LOCALE } from '@angular/material/core';
import {ReactiveFormsModule, FormsModule, FormBuilder} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { AngularIbanModule } from 'angular-iban';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {CommonModule, registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule,routerReducer,RouterStateSerializer } from '@ngrx/router-store';
import {transferReducer} from "./state/transfer.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
registerLocaleData(localeDe, 'de-DE', localeDeExtra);

import {EffectsModule,} from "@ngrx/effects";
import {TransferEffect} from "./state/transfer.effects";
import {CustomSerializer} from "./shared/utils";


@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularIbanModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true,
    }),
    StoreModule.forRoot({router: routerReducer}),
    StoreRouterConnectingModule.forRoot({stateKey:"router"}),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature("transfers", transferReducer),
    EffectsModule.forFeature([TransferEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })

  ],
  entryComponents:[
    DialogComponent,
  ],

  providers: [
    {provide: MAT_DIALOG_DATA, useValue : {}},
    {provide: RouterStateSerializer, useClass: CustomSerializer},
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: LOCALE_ID,
      useValue: 'de-DE'
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
