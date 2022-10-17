import {Injectable} from "@angular/core";

import {Actions, Effect,ofType} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable, of} from "rxjs";
import { map, mergeMap, catchError} from "rxjs/operators";

import {ApiService as TransferService} from "../services/api.service";
import * as transferActions from "../state/transfer.actions"
import {Transfer} from "../transfer.model";


@Injectable()
export  class TransferEffect{
  constructor(
    private  actions$: Actions,
    private transferService: TransferService,
  ) {}

  @Effect()
  loadTransfers$:Observable<Action> = this.actions$.pipe(
    ofType<transferActions.LoadTransfers>(
      transferActions.TransferActionTypes.LOAD_TRANSFERS
    ),mergeMap((actions: transferActions.LoadTransfers) =>
    this.transferService.getTransfers().pipe(
      map((transfers: Transfer[]) =>
      new transferActions.LoadTransfersSuccess(transfers)),
      catchError( err => of(new transferActions.LoadTransfersFail(err)))
    ))
  );


  @Effect()
  loadTransfer$:Observable<Action> = this.actions$.pipe(
    ofType<transferActions.LoadTransfer>(
      transferActions.TransferActionTypes.LOAD_TRANSFER
    ),mergeMap((action: transferActions.LoadTransfer) =>
      this.transferService.getTransferById(action.payload).pipe(
        map((transfer: Transfer) =>
          new transferActions.LoadTransferSuccess(transfer)),
        catchError( err => of(new transferActions.LoadTransferFail(err)))
      ))
  );

  @Effect()
  createTransfer$:Observable<Action> = this.actions$.pipe(
    ofType<transferActions.CreateTransfer>(
      transferActions.TransferActionTypes.CREATE_TRANSFER
    ),
    map((action: transferActions.CreateTransfer) => action.payload),
    mergeMap((transfer: Transfer) =>
      this.transferService.createTransfer(transfer).pipe(
        map((newTransfer: Transfer) =>
          new transferActions.CreateTransferSuccess(newTransfer)),
        catchError( err => of(new transferActions.CreateTransferFail(err)))
      ))
  );

  @Effect()
  updateTransfer$:Observable<Action> = this.actions$.pipe(
    ofType<transferActions.UpdateTransfer>(
      transferActions.TransferActionTypes.UPDATE_TRANSFER
    ),
    map((action: transferActions.UpdateTransfer) => action.payload),
    mergeMap((transfer: Transfer) =>
      this.transferService.updateTransfer(transfer).pipe(
        map((updateTransfer: Transfer) =>
          new transferActions.UpdateTransferSuccess({
            id:updateTransfer.id,
            changes: updateTransfer,
          } )),
        catchError( err => of(new transferActions.UpdateTransferFail(err)))
      ))
  );

  @Effect()
  deleteTransfer$:Observable<Action> = this.actions$.pipe(
    ofType<transferActions.DeleteTransfer>(
      transferActions.TransferActionTypes.DELETE_TRANSFER
    ),
    map((action: transferActions.DeleteTransfer) => action.payload),
    mergeMap((id:string) =>
      this.transferService.deleteTransfer(id).pipe(
        map(() => new transferActions.DeleteTransferSuccess(id)),
        catchError( err => of(new transferActions.DeleteTransferFail(err)))
      ))
  );
}
