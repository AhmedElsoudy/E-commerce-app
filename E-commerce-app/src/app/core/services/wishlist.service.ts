import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string = 'https://ecommerce.routemisr.com'

  wishNumber:BehaviorSubject<number> = new BehaviorSubject(0)

  addToWishList(prodId:string|undefined):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `/api/v1/wishlist`,
    {
      productId: prodId
    })
  }

  getWishList():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/api/v1/wishlist`)
  }
  removeItem(prodId:string|undefined):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `/api/v1/wishlist/${prodId}`)
  }
}
