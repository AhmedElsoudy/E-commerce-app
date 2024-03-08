import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService, private _Router:Router, private _FormBuilder:FormBuilder){}
  msgError:string = ''
  isLoading:boolean = false

  // Create Creative Form With FormBuilder Class
  registerForm:FormGroup = this._FormBuilder.group({
    name:['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email:['', [Validators.required, Validators.email] ],
    password:['', [Validators.required , Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]],
    rePassword:[''],
    phone:['',[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)] ]
  }, {validators:[this.confirmPassword]} as FormControlOptions)


  // Create Reactive Forms with formGroup and FormControl

  // registerForm:FormGroup = new FormGroup({
  //   name:new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   email:new FormControl('', [Validators.required, Validators.email]),
  //   password:new FormControl('',[Validators.required , Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
  //   rePassword:new FormControl(''),
  //   phone:new FormControl('',[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  // },{validators:[this.confirmPassword]} as FormControlOptions)

  confirmPassword(group:FormGroup):void{
    const password = group.get('password');
    const rePassword = group.get('rePassword');

    if(rePassword?.value == ''){
      rePassword?.setErrors({required:true})
    }
    else if(password?.value != rePassword?.value){
      rePassword?.setErrors({mismatch:true})
    }
  }

  handleForm(){
    this.isLoading = true
    const userData = this.registerForm.value
    if(this.registerForm.valid === true){
      this._AuthService.register(userData).subscribe({
        next:(response)=>{
          console.log(response)
          if(response.message =="success"){
            this._Router.navigate(['/login'])
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

  goLogin(){
    this._Router.navigate(['/login'])
  }

}
