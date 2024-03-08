import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl:string = 'https://ecommerce.routemisr.com'

  getProducts(pageNumber:number = 1):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/api/v1/products?page=${pageNumber}`)
  }

  getCategories():Observable<any>{
    return this._HttpClient.get(this.baseUrl + '/api/v1/categories')
  }


  getCategoryDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/api/v1/categories/${id}`)
  }
  getSubCategoryOnCategory(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/api/v1/categories/${id}/subcategories`)
  }
  getProductDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/api/v1/products/${id}`)
  }

  getBrands():Observable<any>{
    return this._HttpClient.get(this.baseUrl + '/api/v1/brands')
  }

}
