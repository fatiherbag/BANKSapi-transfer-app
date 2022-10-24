import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {Transfer} from "../transfer.model";
import {mockTransferArray} from "../../mocks/mockTransfers";
import { mockTransfer1} from "../../mocks/mockTransfers";


describe('ApiService', () => {
  let service: ApiService;
  let httpController: HttpTestingController;
  let url = "http://localhost:3000/transfer";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientTestingModule,
      ],
      providers : [
        ApiService,
        {provide: MAT_DIALOG_DATA, useValue: {}},
      ]
    });
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTransfers and return an array of Transfers', function () {
    service.getTransfers().subscribe((res) => {
      expect(res).toEqual(mockTransferArray);
    });
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}`,
    });
    req.flush(mockTransferArray);
  });

  it('should call getTransferId and return the appropriate Transfer', function () {
    const id = '1';
    service.getTransferById(id).subscribe((data) => {
      expect(data).toEqual(mockTransfer1);
    });
    const req = httpController.expectOne({
      method: `GET`,
      url: `${url}/${id}`,
    });
    req.flush(mockTransfer1);
  });

  it('should call updateTransfer and return the updated Tansfer from the API', function () {
    const updatedTransfer: Transfer = {
      accountHolder: "Max Musterkind",
      iban: "DE75512108001245126199",
      date: "2022-07-03T15:55:46.936Z",
      amount: 2000,
      note: "new transfer from Max Musterking",
      id: "1"
    };

    service.updateTransfer(mockTransfer1).subscribe((data) => {
      expect(data).toEqual(updatedTransfer);
    });

    const  req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/${updatedTransfer.id}`,
    });
    req.flush(updatedTransfer);
  });

  it('should call deleteTransfer and return the apporiate Transfer', function () {
    const deleteTransferId = "1";
    service.deleteTransfer(deleteTransferId).subscribe((data) => {
      expect(data).toEqual(`${deleteTransferId}`);
    });
    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/${deleteTransferId}`,
    });
    req.flush(deleteTransferId);
  });

  it('should call createTransfer and the API should return the Transfer that was added', function () {
    service.createTransfer(mockTransfer1).subscribe((data) => {
      expect(data).toEqual(mockTransfer1);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}`,
    });

    req.flush(mockTransfer1);
  });

});
