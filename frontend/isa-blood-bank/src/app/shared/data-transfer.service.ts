import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  constructor() { }

  private data: any;

  public setData(data: any) {
    this.data = data;
  }

  public getData() {
    let temp = this.data;
    this.clearData();
    return temp;
  }

  private clearData() {
    this.data = undefined;
  }
}
