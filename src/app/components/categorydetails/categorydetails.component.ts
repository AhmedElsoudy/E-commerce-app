import { Category } from './../../core/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductService:ProductService){}

  categoryId:string|null = ''
  specificCategoryId:string|null = ''
  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(param)=>{
          this.categoryId = param.get('id')
          console.log(this.categoryId)
        },
        error:(err)=>{
          console.log(err)
        }
      })

      this._ProductService.getSubCategoryOnCategory(this.categoryId).subscribe({
        next:(response)=>{
          console.log(response)
        },
        error:(err)=>{
          console.log(err)
        }
      })

  }
}
