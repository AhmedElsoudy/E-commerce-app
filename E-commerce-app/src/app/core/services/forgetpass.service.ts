import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetpassService {

  constructor( private _HttpClient:HttpClient) { }

  baseUrl:string = 'https://ecommerce.routemisr.com/api/v1/auth/'

  forgetPassword( forgetPasswordEmail:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `forgotPasswords`, forgetPasswordEmail)
  }

  verifyCode(code:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `verifyResetCode` , code)
  }
  updatePassword(newPassword:object):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `resetPassword` , newPassword)
  }
}
