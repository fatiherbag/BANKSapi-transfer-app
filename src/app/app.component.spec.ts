import {TestBed, async, fakeAsync, tick,} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {StoreModule} from "@ngrx/store";
import {provideMockStore} from "@ngrx/store/testing";
import { MatDialogRef} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {By} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        FormsModule,
        ReactiveFormsModule,
  ],
      declarations: [
        AppComponent,
        DialogComponent,
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue : {}},
        {provide: MatDialogRef, useValue: {}},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'transfer-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('transfer-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector(
      'mat-toolbar span')?.textContent)
      .toContain('transfer-app');
  });

  it('Add Transfer button clicked', fakeAsync (() => {
    const fixture = TestBed.createComponent(AppComponent);
    const appInstance = fixture.componentInstance;
    spyOn(appInstance,'openDialog');
    let appComponentButtons = fixture.debugElement.queryAll(By.css('button'));
    const addTransferButton: HTMLButtonElement = appComponentButtons[1].nativeElement;
    addTransferButton.click();
    tick();
    expect(appInstance.openDialog).toHaveBeenCalled();

  }));
});
