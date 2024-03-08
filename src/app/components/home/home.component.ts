import { RouterLink } from '@angular/router';
import { CuttextPipe } from './../../core/pipes/cuttext.pipe';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { product } from 'src/app/core/interfaces/product';
import { Category } from 'src/app/core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CuttextPipe,CarouselModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private _ProductService:ProductService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService

  ){}

  products:product[] = []
  categories:Category[] = []
  wishListDetails:string[] = []


  ngOnInit(): void {

    this._ProductService.getProducts().subscribe({
      next:(response)=>{
        this.products = response.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this._ProductService.getCategories().subscribe({
      next:(response)=>{
        this.categories = response.data
      },
      error:(err)=>{
        console.log(err)
      }
    })
    this._WishlistService.getWishList().subscribe({
      next:(response)=>{
        console.log(response.data)
        const newData = response.data.map((item:any)=>item._id)
        this.wishListDetails = newData
        this._WishlistService.wishNumber.next(response.count)

      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:1000,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:700,
    navText: ['', ''],
    items:1,
    nav: false
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
            console.log(response.data)
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
