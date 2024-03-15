import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path:'',canActivate:[authGuard],loadComponent:()=>import('./layouts/blank-layout/blank-layout.component').then((m)=>m.BlankLayoutComponent),
    children:[
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'home',loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent), title:'Home'},
      {path:'cart', loadComponent:()=>import('./components/cart/cart.component').then((m)=>m.CartComponent), title:'Cart'},
      {path:'wishlist', loadComponent:()=>import('./components/wishlist/wishlist.component').then((m)=>m.WishlistComponent), title:'Wish List'},
      {path:'products', loadComponent:()=>import('./components/products/products.component').then((m)=>m.ProductsComponent), title:'Products'},
      {path:'details/:id', loadComponent:()=>import('./components/details/details.component').then((m)=>m.DetailsComponent), title:'Details'},
      {path:'brands',loadComponent:()=>import('./components/brands/brands.component').then((m)=>m.BrandsComponent), title:'Brands'},
      {path:'allorders',loadComponent:()=>import('./components/allorders/allorders.component').then((m)=>m.AllordersComponent), title:'Orders'},
      {path:'payment/:id',loadComponent:()=>import('./components/payment/payment.component').then((m)=>m.PaymentComponent), title:'Payment'},
      {path:'categories',loadComponent:()=>import('./components/categories/categories.component').then((m)=>m.CategoriesComponent),title:'Categories'},
      {path:'categorydetails/:id',loadComponent:()=>import('./components/categorydetails/categorydetails.component').then((m)=>m.CategorydetailsComponent),title:'Category Details'}
    ]
  },
  {path:'',loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent),
    children:[
      // {path:'',redirectTo:'login',pathMatch:'full'},
      {path:'login',loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent),title:'login'},
      {path:'forgetPassword',loadComponent:()=>import('./components/forgetpassword/forgetpassword.component').then((m)=>m.ForgetpasswordComponent),title:'Forget Password'},
      {path:'register',loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent),title:'register'}
    ]
  },
  {path:'**',loadComponent:()=>import('./components/notfound/notfound.component').then((m)=>m.NotfoundComponent
  ), title:'not found'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

