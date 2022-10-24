import * as transferActions from "./transfer.actions";
import {Transfer} from "../transfer.model";
import * as fromRoot from "../app-state/app-state"
import {ActionTypes} from "./transfer.actions";

import {createFeatureSelector, createSelector, Store} from "@ngrx/store";
import {state} from "@angular/animations";
import {EntityState,EntityAdapter, createEntityAdapter} from "@ngrx/entity";
import {isNumber} from "@ngrx/store/src/meta-reducers/utils";
import {Injectable} from "@angular/core";

export interface TransferState extends EntityState<Transfer>{
  selectedTransferId: string | null,
  entities: {
    [id: string] : Transfer
  },
  loading: boolean,
  loaded: boolean,
  error: string,
}

export  interface AppState extends fromRoot.AppState{
  transfers: TransferState;
}

export  const  transferAdapter:
  EntityAdapter<Transfer> = createEntityAdapter<Transfer>();

export  const  defaultTransfer: TransferState = {
  ids:[],
  entities : {},
  selectedTransferId: null,
  loading: false,
  loaded: false,
  error: "",
}

export const  initialState = transferAdapter.getInitialState(defaultTransfer);


export function transferReducer(
  state = initialState,
  action : transferActions.ActionTypes
):TransferState{
  switch (action.type){
    case transferActions.TransferActionTypes.LOAD_TRANSFERS:{
      return {
        ...state,
        loading: true
      }
    }
    case transferActions.TransferActionTypes.LOAD_TRANSFERS_SUCCESS:{
      return transferAdapter.addMany(action.payload,{
          ...state,
          loading:false,
          loaded: true,
        })
    }
    case transferActions.TransferActionTypes.LOAD_TRANSFERS_FAIL:{
      return {
        ...state,
        entities:{},
        loading:false,
        loaded:false,
        error: action.payload
      }
    }

    // Load Transfer
    case transferActions.TransferActionTypes.LOAD_TRANSFER_SUCCESS:{
      return transferAdapter.addOne(action.payload,{
        ...state,
        selectedTransferId: action.payload.id
      });
    }
    case transferActions.TransferActionTypes.LOAD_TRANSFER_FAIL:{
      return {
        ...state,
        error: action.payload
      }
    }

    //Create Transfer
    case transferActions.TransferActionTypes.CREATE_TRANSFER_SUCCESS:{
      return transferAdapter.addOne(action.payload, state);
    }
    case transferActions.TransferActionTypes.CREATE_TRANSFER_FAIL:{
      return {
        ...state,
        error: action.payload
      }
    }

    //Update Transfer
    case transferActions.TransferActionTypes.UPDATE_TRANSFER_SUCCESS:{
      return transferAdapter.updateOne(action.payload, state);
    }
    case transferActions.TransferActionTypes.UPDATE_TRANSFER_FAIL:{
      return {
        ...state,
        error: action.payload
      }
    }

    //Delete Transfer
    case transferActions.TransferActionTypes.DELETE_TRANSFER_SUCCESS:{
      return transferAdapter.removeOne(action.payload, state);
    }
    case transferActions.TransferActionTypes.DELETE_TRANSFER_FAIL:{
      return {
        ...state,
        error: action.payload
      }
    }


    default:{
      return state;
    }
  }
}


const getTransferFeatureState = createFeatureSelector<TransferState>(
  "transfers"
);

export  const getTransfers = createSelector(
  getTransferFeatureState,
  transferAdapter.getSelectors().selectAll
  );

export  const getTransfersLoading = createSelector(
  getTransferFeatureState,
  (state: TransferState) => state.loading
);

export  const getTransfersLoaded = createSelector(
  getTransferFeatureState,
  (state: TransferState) => state.loaded
);

export  const getTransfersError = createSelector(
  getTransferFeatureState,
  (state: TransferState) => state.error
);

export  const getCurrentTransferId = createSelector(
  getTransferFeatureState,
  (state: TransferState) => state.selectedTransferId
)

export  const getCurrentTransfer = createSelector(
  getTransferFeatureState,
  getCurrentTransferId,
  state => state.entities[state.selectedTransferId!]);
