import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Store, StoreModule} from "@ngrx/store";
import {
  CreateTransfer,
  CreateTransferSuccess, DeleteTransferSuccess,
  LoadTransfers,
  TransferActionTypes,
  TransferTestActions
} from "./transfer.actions";
import {Transfer} from "../transfer.model";
import * as transferActions from "./transfer.actions";
import {mockTransfer1} from "../../mocks/mockTransfers";

describe('TransferActions', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
    }).compileComponents();
  });


  it('should create a CreateTransfer action containing a payload', function () {
    const payload: Transfer = {
      accountHolder: "Max Musterkind",
      iban: "DE75512108001245126199",
      date: "2022-07-03T15:55:46.936Z",
      amount: 2000,
      note: "new transfer from Max Musterkind",
      id: "1"
    };
    const action = new transferActions.CreateTransferSuccess(payload);

    expect({...action}).toEqual({
      type: transferActions.TransferActionTypes.CREATE_TRANSFER_SUCCESS,
      payload
    })
  });

  it('should dispatch load transfers action', function () {
    const expectedAction = new LoadTransfers();
    const store = jasmine.createSpyObj<Store<Transfer>>('store',['dispatch']);

    const transferActions = new TransferTestActions(store);
    transferActions.loadTransfers();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch add transfer action', function () {
    const expectedAction = new CreateTransferSuccess(mockTransfer1);
    const store = jasmine.createSpyObj<Store<Transfer>>('store',['dispatch']);
    const transferActions = new TransferTestActions(store);
    transferActions.createTransfers(mockTransfer1);
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch delete transfer action', function () {
    const expectedAction = new DeleteTransferSuccess(mockTransfer1.id);
    const store = jasmine.createSpyObj<Store<Transfer>>('store',['dispatch']);
    const transferActions = new TransferTestActions(store);
    transferActions.deleteTransfers(mockTransfer1.id);
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

});
