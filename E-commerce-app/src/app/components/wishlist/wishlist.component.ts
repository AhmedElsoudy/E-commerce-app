import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { product } from 'src/app/core/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipes/cuttext.pipe';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink,CuttextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(
    private _WishlistService:WishlistService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _CartService:CartService
    ){}


  products:product[] = []
  wishListDetails:string[] = []

  ngOnInit(): void {
      this._WishlistService.getWishList().subscribe({
        next:(response)=>{
          console.log(response)
          this.products = response.data
          const newData = response.data.map((item:any)=>item._id)
          this.wishListDetails = newData
          this._WishlistService.wishNumber.next(response.count)

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
  removeItemFromWishList(id:string|undefined):void{
    this._WishlistService.removeItem(id).subscribe({
      next:(response)=>{
        console.log(response)
        this._ToastrService.success(response.message)
        this._WishlistService.wishNumber.next(response.count)
        this.wishListDetails = response.data
        const newProducts = this.products.filter((item)=>this.wishListDetails.includes(item._id))
        this.products = newProducts
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
