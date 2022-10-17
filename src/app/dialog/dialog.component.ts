import {Component, Inject, NgModule, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IbanValidatorDirective, ValidatorService} from "angular-iban";
import {ApiService} from "../services/api.service";

import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Store} from "@ngrx/store";
import * as fromTransfer from "../state/transfer.reducer";
import * as transferActions from "../state/transfer.actions";
import {Transfer} from "../transfer.model";
import {Observable, retry} from "rxjs";
import {MatDialogModule} from "@angular/material/dialog";



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})


export class DialogComponent implements OnInit {
  transferForm !: FormGroup;
  actionButton : String = 'Save';
  constructor(
    private  formBuilder : FormBuilder,
    private store: Store<fromTransfer.AppState>,
    private  api: ApiService,
    @Inject(MAT_DIALOG_DATA) public  editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
  ) {}

  ngOnInit(): void {

    if(this.editData.state == 'save'){
      this.transferForm = this.formBuilder.group({
        accountHolder: ['', Validators.required],
        iban : ['', [Validators.required,ValidatorService.validateIban]],
        date : ['', Validators.required],
        amount : ['', [Validators.required,
          Validators.minLength(2),
          Validators.maxLength(8,),
          Validators.pattern('^[0-9]*$'),
        ]],
        note : ['', Validators.required],
      });
    }
    else {
      this.transferForm = this.formBuilder.group({
        accountHolder: ['', Validators.required],
        iban : ['', [Validators.required,ValidatorService.validateIban]],
        date : ['', Validators.required],
        amount : ['', Validators.required],
        note : ['', Validators.required],
        id : null
      });

      // this.store.dispatch(new transferActions.LoadTransfer(this.editData.state.id))
      // console.log("selected id= " + this.editData.state.id);
      // this.store.select(fromTransfer.getCurrentTransferId).forEach(
      //   (value) => console.log( 'values : ' + value));
      // this.store.select((fromTransfer.getCurrentTransfer)).forEach((val =>{
      //   console.log('get current Transfer : ' + JSON.stringify(val))
      // }))
      const transfer$ : Observable<Transfer> = this.store.select(
        fromTransfer.getCurrentTransfer
      );
      transfer$.subscribe((currentTransfer) => {
        if(currentTransfer){
          this.transferForm.patchValue({
            accountHolder: currentTransfer.accountHolder,
            iban: currentTransfer.iban,
            date: currentTransfer.date,
            amount: currentTransfer.amount,
            note: currentTransfer.note,
            id: currentTransfer.id,
          })
        }
      })
    }
  }

  addTransfer(){
    if(this.editData.state == "save"){
      if(this.transferForm.valid){
        const newTransfer: Transfer = {
          accountHolder: this.transferForm.get("accountHolder")?.value,
          iban: this.transferForm.get("iban")?.value,
          date: this.transferForm.get("date")?.value,
          amount: this.transferForm.get("amount")?.value,
          note: this.transferForm.get("note")?.value,
          id: this.transferForm.get("id")?.value
        }
        this.store.dispatch(new transferActions.CreateTransfer(newTransfer));
        this.transferForm.reset();
        this.dialogRef.close('save');
      }
    }else {
      this.updateTransfer();
    }
  }
  updateTransfer(){
    const  updatedTransfer: Transfer = {
      accountHolder: this.transferForm.get("accountHolder")?.value,
      iban: this.transferForm.get("iban")?.value,
      date: this.transferForm.get("date")?.value,
      amount: this.transferForm.get("amount")?.value,
      note: this.transferForm.get("note")?.value,
      id: this.transferForm.get("id")?.value,
    }
    this.store.dispatch(new transferActions.UpdateTransfer(updatedTransfer));
    this.transferForm.reset();
    this.dialogRef.close('save');
  }

}
