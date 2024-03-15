
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{
  constructor(
    private _ActivatedRoute:ActivatedRoute,
    private _ProductService:ProductService,
    private _CartService:CartService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2
  ){}

  productId!:string |null;
  productDetails:any = null
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          this.productId = params.get('id')
          console.log(this.productId)
        }
      })
      this._ProductService.getProductDetails(this.productId).subscribe({
        next:(response)=>{
          this.productDetails = response.data
        },
        error:(err)=>{
          console.log(err)
        }
      })

  }

  productDetailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    items:1,
    nav: true
  }

  goCart(id:string, el:HTMLButtonElement):void{
    this._Renderer2.setAttribute(el,'disabled', 'true')
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        // console.log('addProduct', response.numOfCartItems)
        this._ToastrService.success(response.message)
        this._CartService.cartNumber.next(response.numOfCartItems)
        this._Renderer2.removeAttribute(el,'disabled')
      },
      error:(err)=>{
        console.log(err)
        this._Renderer2.removeAttribute(el,'disabled')
      }
    })
  }

}
