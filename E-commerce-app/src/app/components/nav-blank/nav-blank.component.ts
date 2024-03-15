import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit{
  constructor(
    private _Router:Router,
    private _CartService:CartService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService
    ){}
  shopNumber:number = 0;
  wishListNumber:number = 0;

  ngOnInit(): void {
      this._CartService.cartNumber.subscribe({
        next:(data)=>{
          this.shopNumber = data
        },
        error:(err)=>{
          console.log(err)
        }
      })
      this._WishlistService.wishNumber.subscribe({
        next:(data)=>{
          this.wishListNumber = data
        },
        error:(err)=>{
          console.log(err)
        }
      })
      this._CartService.getUserCart().subscribe({
        next:(response)=>{
          this._CartService.cartNumber.next(response.numOfCartItems)
        },
        error:(err)=>{
          console.log(err)
        }
      })
      this._WishlistService.getWishList().subscribe({
        next:(response)=>{
          this._WishlistService.wishNumber.next(response.count)
        }
      })
  }

  signOut():void{
    localStorage.removeItem('userToken')
    this._Router.navigate(['/login'])
  }

  @ViewChild('navBar') navElement!:ElementRef

  @HostListener('window:scroll')
  onScroll():void{
    if(scrollY > 100){
      this._Renderer2.addClass(this.navElement.nativeElement, 'shadow-lg')
    }else{
      this._Renderer2.removeClass(this.navElement.nativeElement, 'shadow-lg')
    }
  }

}
