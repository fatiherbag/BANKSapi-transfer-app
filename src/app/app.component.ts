import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogComponent} from "./dialog/dialog.component";
import {ApiService} from "./services/api.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
//transfer-list.component.ts
import { Store} from "@ngrx/store";
import * as transferActions from "./state/transfer.actions";
import {state} from "@angular/animations";
import {filter, Observable, tap} from "rxjs";
import {Transfer} from "./transfer.model";
import {select} from "@ngrx/store";
import * as fromTransfer from "./state/transfer.reducer"
import {map} from "rxjs/operators";
import {TransferState} from "./state/transfer.reducer";
import {arrRemove} from "rxjs/internal/util/arrRemove";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'transfer-app';
  transfers$! : Observable<Transfer[]>;

  transferDataBase: Transfer[]= [];
  displayedColumns: string[] = [
    'accountHolder', 'amount', 'date', 'iban','note','action'];
  dataSource!: MatTableDataSource<Transfer>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private  dialog : MatDialog,
              private api: ApiService,
              private store:Store<fromTransfer.AppState>,
              ) {
  }
  ngOnInit() {

    this.store.dispatch(new transferActions.LoadTransfers());
    this.transfers$ = this.store.pipe(select(fromTransfer.getTransfers))

    this.store.select(fromTransfer.getTransfers).subscribe(arr => {
      this.transferDataBase = arr;
      this.dataSource = new MatTableDataSource(this.transferDataBase);
    });
  }



  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        state: 'save',
      },
    })
  }

  deleteTransfer(transfer: Transfer){
    this.store.dispatch(new transferActions.DeleteTransfer(transfer.id));
  }

  editTransfer(transfer: Transfer){
    console.log("edit transfer ici = " + transfer.id);
    // this.store.dispatch(new transferActions.LoadTransfer(transfer.id));
    this.store.dispatch(new transferActions.LoadTransferSuccess(transfer));
    this.dialog.open(DialogComponent,{
      width: '30%',
      data:{state: transfer } })
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
