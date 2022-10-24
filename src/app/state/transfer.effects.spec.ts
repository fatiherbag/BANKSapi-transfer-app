import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Store, StoreModule} from "@ngrx/store";
import {
  CreateTransfer,
  CreateTransferSuccess, DeleteTransfer, DeleteTransferSuccess,
  LoadTransfer, LoadTransferFail,
  LoadTransfers,
  LoadTransfersFail,
  LoadTransfersSuccess, LoadTransferSuccess,
  TransferActionTypes,
  TransferTestActions, UpdateTransfer, UpdateTransferSuccess
} from "./transfer.actions";
import {Transfer} from "../transfer.model";
import {TransferEffect} from "./transfer.effects";
import {provideMockActions} from "@ngrx/effects/testing";
import {Observable, of} from "rxjs";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {initialState, TransferState} from "./transfer.reducer";
import {ApiService} from "../services/api.service"
import {mockTransfer1, mockTransferArray} from "../../mocks/mockTransfers";
import {cold, hot} from "jasmine-marbles";


class MockTransferService {
  fetchUsers() {
    return of(mockTransfer1);
  }
}



describe('TransferEffects', () => {
  let actions$ : Observable<any>;
  let effects: TransferEffect;
  let tranferService: jasmine.SpyObj<ApiService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
      ],
      providers: [
        TransferEffect,
        provideMockActions(() => actions$),
        { provide: ApiService,
          useValue: {
            getTransfers:  jasmine.createSpy(),
            getTransferById: jasmine.createSpy(),
            createTransfer: jasmine.createSpy(),
            deleteTransfer: jasmine.createSpy(),
            updateTransfer: jasmine.createSpy(),
          }},
      ]
    });
    effects = TestBed.get(TransferEffect);
    tranferService = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });


  //LoadTransfers
  it('should return a stream  with transfer list loaded action', function () {
    const action = new LoadTransfers();
    const outcome = new LoadTransfersSuccess(mockTransferArray);

    actions$ = hot('-a', {a:action});
    const response = cold('-a|',{a:mockTransferArray});
    tranferService.getTransfers.and.returnValue(response);

    const expected = cold('--b',{b:outcome});
    expect(effects.loadTransfers$).toBeObservable(expected);
  });

  it('should fail and return an action with the error', function () {
    const action = new LoadTransfers();
    const error = new Error('Error when try to get transfers') as any;
    const outcome = new LoadTransfersFail(error);

    actions$ = hot('-a', {a:action});
    const response = cold('-#|',{},error);
    tranferService.getTransfers.and.returnValue(response);

    const expected = cold('--b',{b:outcome});
    expect(effects.loadTransfers$).toBeObservable(expected);
  });



  //LoadTransfer

  it('should return a stream  with transfer loaded action', function () {
    const action = new LoadTransfer(mockTransfer1.id);
    const outcome = new LoadTransferSuccess(mockTransfer1);

    actions$ = hot('-a', {a:action});
    const response = cold('-a|',{a:mockTransfer1});
    tranferService.getTransferById.and.returnValue(response);

    const expected = cold('--b',{b:outcome});
    expect(effects.loadTransfer$).toBeObservable(expected);
  });

  it('should fail when try to get TransferById and return an action with the error', function () {

    const action = new LoadTransfer(mockTransfer1.id);
    const error = new Error('Error when try to get transfer') as any;
    const outcome = new LoadTransferFail(error);

    actions$ = hot('-a', {a:action});
    const response = cold('-#|',{},error);
    tranferService.getTransferById.and.returnValue(response);

    const expected = cold('--b',{b:outcome});
    expect(effects.loadTransfer$).toBeObservable(expected);
  });


  //CreateTransfer
  it('should a stream with created transfer action', function () {
    const action = new CreateTransfer(mockTransfer1);
    const outcome = new CreateTransferSuccess(mockTransfer1);

    actions$ = hot('-a', {a:action});
    const response = cold('-a|',{a: mockTransfer1});
    tranferService.createTransfer.and.returnValue(response);

    const expected = cold('--b',{b:outcome});
    expect(effects.createTransfer$).toBeObservable(expected);
  });

  //DeleteTransfer
  it('should a stream with deleted transfer action', function () {
    const action = new DeleteTransfer(mockTransfer1.id);
    const outcome = new DeleteTransferSuccess(mockTransfer1.id);

    actions$ = hot('-a', {a:action});
    const response = cold('-a|',{a: mockTransfer1.id},);
    tranferService.deleteTransfer.and.returnValue(response);

    const expected = cold('--b',{b:outcome});
    expect(effects.deleteTransfer$).toBeObservable(expected);
  });

  //UpdateTransfer
  it('should a stream with updated transfer action', function () {
    const action = new UpdateTransfer(mockTransfer1);
    const outcome = new UpdateTransferSuccess({id:mockTransfer1.id, changes: mockTransfer1});

    actions$ = hot('-a', {a:action});
    const response = cold('-a|',{a: mockTransfer1},);
    tranferService.updateTransfer.and.returnValue(response);

    const expected = cold('--b',{b:outcome});
    expect(effects.updateTransfer$).toBeObservable(expected);
  });

});
