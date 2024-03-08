import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string = 'https://ecommerce.routemisr.com'

  cartNumber:BehaviorSubject<number> = new BehaviorSubject(0)

  addToCart(prodId:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl + '/api/v1/cart',
    {
      productId:prodId
    }

    )
  }

  getUserCart():Observable<any>{
    return this._HttpClient.get(this.baseUrl + '/api/v1/cart'
    )
  }
  removeProductCart(prodId:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `/api/v1/cart/${prodId}`
    )
  }

  updateQuantity(countQuantity:number, prodId:string):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `/api/v1/cart/${prodId}`,
    {
      count: countQuantity
    }
    )
  }

  clearCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `/api/v1/cart`
    )
  }

  checkOut(id:string |null, orderInfo:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl +
      `/api/v1/orders/checkout-session/${id}?url=https://github.com/AhmedElsoudy/E-commerce-app.git`,
      {
        shippingAddress:orderInfo
      }

      )
  }
}
