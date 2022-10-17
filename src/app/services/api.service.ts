import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Transfer} from "../transfer.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private transfersUrl = "http://localhost:3000/transfer";
  constructor(private http: HttpClient) { }

  // postTransfer(data : any){
  //   return this.http.post("http://localhost:3000/transfer/",data);
  // }
  createTransfer(payload: Transfer): Observable<Transfer> {
    return this.http.post<Transfer>(this.transfersUrl, payload);
  }
  // getTransfer(){
  //   return this.http.get<any>("http://localhost:3000/transfer/");
  // }
  getTransfers(): Observable<Transfer[]> {
    return this.http.get<Transfer[]>(this.transfersUrl);
  }
  getTransferById(payload: string): Observable<Transfer> {
    return this.http.get<Transfer>(`${this.transfersUrl}/${payload}`);
  }

  updateTransfer(transfer: Transfer): Observable<Transfer> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    console.log('update ' + JSON.stringify(transfer));
    return this.http.put<Transfer>(
      `${this.transfersUrl}/${transfer.id}`,  JSON.stringify(transfer), {headers: header}
    );
  }

  // putTransfer(data:any,id:string){
  //   const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8; charset=utf-8');
  //   return this.http.put<any>("http://localhost:3000/transfer/"+ id, data);
  // }
  deleteTransfer(payload: string){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this.http.delete("http://localhost:3000/transfer/"+ payload, {responseType: 'text'} );
  }
}
