import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {Transfer} from "../transfer.model";


describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    let httpController: HttpTestingController;
    let url = "http://localhost:3000/transfer";
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
});
