import {Action, Store} from "@ngrx/store";
import { Transfer } from "../transfer.model";

import {Update} from "@ngrx/entity";
import {UpdateNum, UpdateStr} from "@ngrx/entity/src/models";
import {Injectable} from "@angular/core";
export enum dialogActionTypes{
  SAVED_DIALOG_SUCCESS = "[Dialog] Saved",
  UPDATE_DIALOG_SUCCESS = "[Dialog] Updated",
}




export  enum  TransferActionTypes{
  LOAD_TRANSFERS = "[Transfer] Load Transfers",
  LOAD_TRANSFERS_SUCCESS = "[Transfer] Load Transfers Success",
  LOAD_TRANSFERS_FAIL = "[Transfer] Load Transfers Fail",
  LOAD_TRANSFER = "[Transfer] Load Transfer",
  LOAD_TRANSFER_SUCCESS = "[Transfer] Load Transfer Success",
  LOAD_TRANSFER_FAIL = "[Transfer] Load Transfer Fail",
  CREATE_TRANSFER = "[Transfer] Create Transfer",
  CREATE_TRANSFER_SUCCESS = "[Transfer] Create Transfer Success",
  CREATE_TRANSFER_FAIL = "[Transfer] Create Transfer Fail",
  UPDATE_TRANSFER = "[Transfer] Update Transfer",
  UPDATE_TRANSFER_SUCCESS = "[Transfer] Update Transfer Success",
  UPDATE_TRANSFER_FAIL = "[Transfer] Update Transfer Fail",
  DELETE_TRANSFER = "[Transfer] Delete Transfer",
  DELETE_TRANSFER_SUCCESS = "[Transfer] Delete Transfer Success",
  DELETE_TRANSFER_FAIL = "[Transfer] Delete Transfer Fail",
}

//LOAD
export  class  LoadTransfers implements Action{
  readonly  type = TransferActionTypes.LOAD_TRANSFERS;
}

export  class  LoadTransfersSuccess implements Action{
  readonly  type = TransferActionTypes.LOAD_TRANSFERS_SUCCESS;
  constructor(public payload: Transfer[]) {}
}

export  class  LoadTransfersFail implements Action{
  readonly  type = TransferActionTypes.LOAD_TRANSFERS_FAIL;
  constructor(public payload: string) {}
}

export  class  LoadTransfer implements Action{
  readonly  type = TransferActionTypes.LOAD_TRANSFER;
  constructor(public payload: string) {}
}

export  class  LoadTransferSuccess implements Action{
  readonly  type = TransferActionTypes.LOAD_TRANSFER_SUCCESS;
  constructor(public payload: Transfer) {}
}

export  class  LoadTransferFail implements Action{
  readonly  type = TransferActionTypes.LOAD_TRANSFER_FAIL;
  constructor(public payload: string) {}
}

//CREATE

export  class  CreateTransfer implements Action{
  readonly  type = TransferActionTypes.CREATE_TRANSFER;
  constructor(public payload: Transfer) {}
}

export  class  CreateTransferSuccess implements Action{
  readonly  type = TransferActionTypes.CREATE_TRANSFER_SUCCESS;
  constructor(public payload: Transfer) {}
}

export  class  CreateTransferFail implements Action{
  readonly  type = TransferActionTypes.CREATE_TRANSFER_FAIL;
  constructor(public payload: string) {}
}

//UPDATE

export  class  UpdateTransfer implements Action{
  readonly  type = TransferActionTypes.UPDATE_TRANSFER;
  constructor(public payload: Transfer) {}
}

export  class  UpdateTransferSuccess implements Action{
  readonly  type = TransferActionTypes.UPDATE_TRANSFER_SUCCESS;
  constructor(public payload: Update<Transfer>) {}
}

export  class  UpdateTransferFail implements Action{
  readonly  type = TransferActionTypes.UPDATE_TRANSFER_FAIL;
  constructor(public payload: string) {}
}

//DELETE

export  class  DeleteTransfer implements Action{
  readonly  type = TransferActionTypes.DELETE_TRANSFER;
  constructor(public payload: string) {}
}

export  class  DeleteTransferSuccess implements Action{
  readonly  type = TransferActionTypes.DELETE_TRANSFER_SUCCESS;
  constructor(public payload: string) {}
}

export  class  DeleteTransferFail implements Action{
  readonly  type = TransferActionTypes.DELETE_TRANSFER_FAIL;
  constructor(public payload: string) {}
}

export type ActionTypes =
  LoadTransfers |
  LoadTransfersSuccess |
  LoadTransfersFail |
  LoadTransfer |
  LoadTransferSuccess |
  LoadTransferFail |
  UpdateTransfer |
  UpdateTransferSuccess |
  UpdateTransferFail |
  CreateTransfer |
  CreateTransferSuccess |
  CreateTransferFail |
  DeleteTransfer |
  DeleteTransferSuccess |
  DeleteTransferFail;


@Injectable({ providedIn: 'root' })
export class TransferTestActions {
  constructor(private store: Store<Transfer>) {}

  public loadTransfers(): void {
    this.store.dispatch(new LoadTransfers());
  }

  public createTransfers(payload: Transfer): void {
    this.store.dispatch(new CreateTransferSuccess(payload));
  }

  public deleteTransfers(id: string) {
    this.store.dispatch(new DeleteTransferSuccess(id));
  }

  public updateTransfers(payload: Transfer) {
    this.store.dispatch(new UpdateTransferSuccess({id: payload.id, changes: payload}));
  }

}
