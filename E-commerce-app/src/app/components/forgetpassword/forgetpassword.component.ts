import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetpassService } from 'src/app/core/services/forgetpass.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {
  constructor(private _ForgetpassService:ForgetpassService,private _ToastrService:ToastrService,private _Router:Router){}

  status1:boolean = true;
  status2:boolean = false;
  status3:boolean = false;
  isLoading:boolean = false
  email:string = ''

  forgetPassword:FormGroup = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email])
  })

  resetCode:FormGroup = new FormGroup({
    resetCode:new FormControl('')
  })

  resetPassword:FormGroup = new FormGroup({
    newPassword:new FormControl('',[Validators.required , Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)])
  })

  sendEmail():void{
    this.isLoading =true
    const forPassword:any = this.forgetPassword.value
    this.email = forPassword.email
    this._ForgetpassService.forgetPassword(forPassword).subscribe({
      next:(response)=>{
        console.log(response)
        this.isLoading =false
        this._ToastrService.success(response.message)
        this.status1 = false;
        this.status2 = true
      },
      error:(err)=>{
        this.isLoading =false
        this._ToastrService.error(err.error.message)
      }
    })
  }

  sendCode():void{
    this.isLoading =true
    const verCode:any = this.resetCode.value
    this._ForgetpassService.verifyCode(verCode).subscribe({
      next:(response)=>{
        console.log(response)
        this.isLoading =false
        this._ToastrService.success(response.status)
        this.status2 = false;
        this.status3 = true
      },
      error:(err)=>{
        this.isLoading =false
        this._ToastrService.error(err.error.message)
      }
    })
  }

  sendNewPassword():void{
    const newPassword:any = this.resetPassword.value
    newPassword.email = this.email
    console.log(newPassword)
    this._ForgetpassService.updatePassword(newPassword).subscribe({
      next:(response)=>{
        console.log(response)
        localStorage.setItem('userToken',response.token)
        this._Router.navigate(['/home'])

      },
      error:(err)=>{
        this._ToastrService.error(err.error.message)
      }
    })

  }
}
