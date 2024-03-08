import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipes/cuttext.pipe';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink,CuttextPipe],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService, private _Renderer2:Renderer2){}

  cartProductDetails:any = null

  ngOnInit(): void {
      this._CartService.getUserCart().subscribe({
        next:(response)=>{
          this.cartProductDetails = response.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }

  removeItem(id:string):void{
    this._CartService.removeProductCart(id).subscribe({
      next:(response)=>{
        this.cartProductDetails = response.data
        this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }

  changeQuantity(count:number, id:string, el1:HTMLButtonElement, el2:HTMLButtonElement):void{
    if(count >= 1){
      this._Renderer2.setAttribute(el1,'disabled', 'true')
      this._Renderer2.setAttribute(el2,'disabled', 'true')
      this._CartService.updateQuantity(count,id).subscribe({
        next:(response)=>{
          this._Renderer2.removeAttribute(el1,'disabled')
          this._Renderer2.removeAttribute(el2,'disabled')
          this.cartProductDetails = response.data
        },
        error:(err)=>{
          this._Renderer2.removeAttribute(el1,'disabled')
          this._Renderer2.removeAttribute(el2,'disabled')
        }
      })
    }else{
      this.removeItem(id)
    }
  }

  clearAll():void{
    this._CartService.clearCart().subscribe({
      next:(response)=>{
        if(response.message === "success"){
          this.cartProductDetails = null
          this._CartService.cartNumber.next(0)
        }
      },
      error:(err)=>{
        console.log(err)
      }
    })
    }
}
