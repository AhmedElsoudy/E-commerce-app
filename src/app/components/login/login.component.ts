import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService, private _Router:Router, private _FormBuilder:FormBuilder){}
  msgError:string = ''
  isLoading:boolean = false

  // Create Creative Form With FormBuilder Class
  loginForm:FormGroup = this._FormBuilder.group({

    email:['', [Validators.required, Validators.email] ],
    password:['', [Validators.required , Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]],

  })


  // Create Reactive Forms with formGroup and FormControl

  // loginForm:FormGroup = new FormGroup({
  //   email:new FormControl('', [Validators.required, Validators.email]),
  //   password:new FormControl('',[Validators.required , Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  // })



  handleForm(){
    this.isLoading = true
    const userData = this.loginForm.value
    if(this.loginForm.valid === true){
      this._AuthService.login(userData).subscribe({
        next:(response)=>{
          if(response.message =="success"){
            localStorage.setItem('userToken',response.token)
            this._AuthService.decodeToken()
            this._Router.navigate(['/home'])
            this.isLoading = false
          }
        },
        error:(err)=>{
          console.log(err)
          this.isLoading = false
          this.msgError = err.error.message
        }
      })
    }
  }



}
