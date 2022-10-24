import {TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Store, StoreModule} from "@ngrx/store";
import {transferReducer, initialState} from "./transfer.reducer";
import * as transferActions from "./transfer.actions";
import {Transfer} from "../transfer.model";
import * as fromTransfer from "./transfer.reducer"
import {mockTransfer1, mockTransferArray} from "../../mocks/mockTransfers";


describe('TransferReducer', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  });

  it('should return loading true', function () {
    const loadTransfersAction = new transferActions.LoadTransfers;
    const newState = transferReducer(initialState,loadTransfersAction);
    expect(newState.loading).toBe(true);
  });


  it('should return loading true', function () {
    const loadTransfersAction = new transferActions.LoadTransfersSuccess(mockTransferArray);
    const newState = transferReducer(initialState,loadTransfersAction);
    expect(newState.loading).toBe(false);
    expect(newState.loaded).toBe(true);
  });

  it('should return loaded false and error', function () {
    const error = new Error('http error').message;
    const failTransferAction = new transferActions.LoadTransfersFail(error);
    const newState = transferReducer(initialState,failTransferAction);
    expect(newState.loaded).toBe(false);
    expect(newState.error).toBe(error);
  });



  // LoadTransfer
  it('should return loading true for transfer Item', function () {
    const loadTransferAction = new transferActions.LoadTransferSuccess(mockTransfer1);
    const newState = transferReducer(initialState,loadTransferAction);
    expect(newState.selectedTransferId).toBe(mockTransfer1.id);
  });

  it('should return loaded false and error for transfer Item', function () {
    const error = new Error('http error').message;
    const failTransferAction = new transferActions.LoadTransferFail(error);
    const newState = transferReducer(initialState,failTransferAction);
    expect(newState.error).toBe(error);
  });


  //CreateTransferSuccess
  it('should add new transfer to transfer list', function () {
    const addTransferItem: Transfer = {
      accountHolder: "Max Musterkind",
      iban: "DE75512108001245126199",
      date: "2022-07-03T15:55:46.936Z",
      amount: 2000,
      note: "new transfer from Max Musterkind",
      id: "1"
    };
    const createTransfersAction = new transferActions.CreateTransferSuccess(addTransferItem);
    const newState = transferReducer(initialState, createTransfersAction);
    expect(newState.ids.length).toBe(1);
    // console.log(typeof newState.ids[0]);
    expect(newState.ids[0]).toEqual(addTransferItem.id);
  });


  it('should return  error for fail while creating transfer', function () {
    const error = new Error('http error').message;
    const failTransferAction = new transferActions.CreateTransferFail(error);
    const newState = transferReducer(initialState,failTransferAction);
    expect(newState.error).toBe(error);
  });


  //DeleteTransferSuccess
  it('should delete transfer from transfer list', function () {
    const transferItem: Transfer = {
      accountHolder: "Max Musterkind",
      iban: "DE75512108001245126199",
      date: "2022-07-03T15:55:46.936Z",
      amount: 3000,
      note: "new transfer from Max Musterkind",
      id: "1"
    };

    initialState.ids = [transferItem.id];
    initialState.entities = { '1' : transferItem }
    expect(initialState.entities["1"].id).toBe("1");
    const deleteTransferAction = new transferActions.DeleteTransferSuccess('1');
    const newState = transferReducer(initialState,deleteTransferAction);
    expect(newState.ids.length).toBe(0);
  });


  it('should return  error for fail while deleting transfer', function () {
    const error = new Error('http error').message;
    const failTransferAction = new transferActions.DeleteTransferFail(error);
    const newState = transferReducer(initialState,failTransferAction);
    expect(newState.error).toBe(error);
  });


  //UpdateTransferSuccess
  it('should update transfer list', function () {
    const transferItem: Transfer = {
      accountHolder: "Max Musterkind",
      iban: "DE75512108001245126199",
      date: "2022-07-03T15:55:46.936Z",
      amount: 3000,
      note: "new transfer from Max Musterkind",
      id: "1"
    };

    initialState.ids = [transferItem.id];
    initialState.entities = { '1' : transferItem }
    expect(initialState.ids.length).toBe(1);
    expect(initialState.entities['1'].amount).toBe(3000);

    const updatedItem: Transfer = transferItem;
    updatedItem.amount = 5050;
    const updateTransferAction = new transferActions.UpdateTransferSuccess(
      {
        id: updatedItem.id,
        changes: updatedItem,
      });
    const newState = transferReducer(initialState,updateTransferAction);
    expect(newState.entities['1']).toEqual(updatedItem);
  });

  it('should return  error for fail while update transfer', function () {
    const error = new Error('http error').message;
    const failTransferAction = new transferActions.UpdateTransferFail(error);
    const newState = transferReducer(initialState,failTransferAction);
    expect(newState.error).toBe(error);
  });



});
