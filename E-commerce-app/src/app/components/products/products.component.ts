import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipes/cuttext.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from 'src/app/core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, CuttextPipe, NgxPaginationModule,SearchPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductService:ProductService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService

  ){}

  products:product[] = []
  pageSize:number = 0;
  currentPage:number = 1;
  total:number = 0;
  searchTerm:string = ''
  wishListDetails:string[] = []



  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next:(response)=>{
        this.products = response.data
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  goCart(id:string, shopping:HTMLElement, correct:HTMLElement):void{

    this._Renderer2.addClass(shopping,'d-none')
    this._Renderer2.removeClass(correct,'d-none')


    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        // console.log('addProduct', response.numOfCartItems)
        this._ToastrService.success(response.message)
        this._Renderer2.addClass(correct,'d-none')
        this._Renderer2.removeClass(shopping,'d-none')
        this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
        this._Renderer2.addClass(correct,'d-none')
        this._Renderer2.removeClass(shopping,'d-none')
      }
    })
  }

  pageChanged(event:any):void{
    this._ProductService.getProducts(event).subscribe({
      next:(response)=>{
        this.products = response.data
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  goWish(id:string|undefined):void{
    this._WishlistService.addToWishList(id).subscribe({
      next:(response)=>{
        console.log(response)
        this._ToastrService.success(response.message)
        this.wishListDetails = response.data
        this._WishlistService.getWishList().subscribe({
          next:(response)=>{
            this._WishlistService.wishNumber.next(response.count)
          },
          error:(err)=>{
            console.log(err)
          }
        })
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }
  removeItemFromWishList(id:string|undefined):void{
    this._WishlistService.removeItem(id).subscribe({
      next:(response)=>{
        console.log(response)
        this._ToastrService.success(response.message)
        this.wishListDetails = response.data
        this._WishlistService.getWishList().subscribe({
          next:(response)=>{
            this._WishlistService.wishNumber.next(response.count)
          },
          error:(err)=>{
            console.log(err)
          }
        })
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


}


