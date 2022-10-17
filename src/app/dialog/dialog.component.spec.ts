import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {StoreModule} from "@ngrx/store";
import {provideMockStore} from "@ngrx/store/testing";
import { MatDialogRef} from "@angular/material/dialog";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {DialogComponent} from "./dialog.component";
import {Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AppComponent} from "../app.component";
import {By} from "@angular/platform-browser";
import {dialogActionTypes} from "../state/transfer.actions";
import {ValidatorService} from "angular-iban";

describe('DialogComponent', () => {
  const formBuilder: FormBuilder = new FormBuilder();
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
        DialogComponent,
        AppComponent,
      ],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue : {}},
        {provide: MatDialogRef, useValue: {}},
        { provide: FormBuilder, useValue: formBuilder }
      ],

      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('should component run', () => {
    const fixture = TestBed.createComponent(DialogComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render Add Transfer Form title', () => {
    const fixture = TestBed.createComponent(DialogComponent);
    fixture.detectChanges();
    //check is there any h1 tag named 'Add Transfer Form'
    const h1Ele = fixture.debugElement.query(By.css('h1'));
    expect(h1Ele.nativeElement.textContent).toBe('Add Transfer Form')
  });

  it('Should be two button on the dialog', () =>{
    const fixture = TestBed.createComponent(DialogComponent);
    fixture.detectChanges();
    //check for is there any button
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length == 2).toBeTruthy();
    //check for is there a button named 'Save'
    const saveButton: HTMLButtonElement = buttons[0].nativeElement;
    const closeButton: HTMLButtonElement = buttons[1].nativeElement;
    expect(saveButton.textContent).toBe('Save');
    expect(closeButton.textContent).toBe('Close');
  })

  it( "should bind input text value to Component property" , () => {
    let fixture: ComponentFixture<DialogComponent>;
    fixture = TestBed.createComponent(DialogComponent);
    let component : DialogComponent;
    component = fixture.componentInstance;
    const  hostElement = fixture.nativeElement;

    const inputName: HTMLInputElement = hostElement.querySelector('#accountHolder1');
    const inputIban: HTMLInputElement = hostElement.querySelector('#iban');
    const inputDate: HTMLInputElement = hostElement.querySelector('#date');
    const inputAmount: HTMLInputElement = hostElement.querySelector('#amount');
    const inputNote: HTMLInputElement = hostElement.querySelector('#note');
    fixture.detectChanges()
    inputName.value = 'Fatih ERBAG';
    inputIban.value = 'DE75512108001245126199';
    inputDate.value = '22/07/2015';
    inputAmount.value = '300';
    inputNote.value = 'A new transfer.';

    inputName.dispatchEvent(new Event(('input')))
    inputIban.dispatchEvent(new Event(('input')))
    inputDate.dispatchEvent(new Event(('input')))
    inputAmount.dispatchEvent(new Event(('input')))
    inputNote.dispatchEvent(new Event(('input')))
    //check bindings
    expect(component.transferForm.get('accountHolder')?.value).toBe('Fatih ERBAG')
    expect(component.transferForm.get('iban')?.value).toBe('DE75512108001245126199')
    expect(component.transferForm.get('date')?.value).toBe('22/07/2015')
    expect(component.transferForm.get('amount')?.value).toBe(300)
    expect(component.transferForm.get('note')?.value).toBe('A new transfer.')

    //check for formgroup values


  })


});
