import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Office } from './postoffice';
@Injectable({
  providedIn: 'root'
})
export class PostofficeService {
  private _url: string = "https://api.postalpincode.in/pincode/"
  constructor(private http: HttpClient) { }

  getPostOfficeDetails(pincode: any): any {
    return this.http.get<Office>(this._url + pincode);
  }

}


// коди країн
// https://stackoverflow.com/questions/61724730/integrating-address-verification-based-on-pincode-and-vice-versa-for-indian-pinc
