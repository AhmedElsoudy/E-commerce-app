import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Brand } from 'src/app/core/interfaces/product';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  constructor(private _ProductService:ProductService){}

  brands:Brand[] = []
  ngOnInit(): void {
      this._ProductService.getBrands().subscribe({
        next:(response)=>{
          console.log(response.data)
          this.brands = response.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
  }
}
