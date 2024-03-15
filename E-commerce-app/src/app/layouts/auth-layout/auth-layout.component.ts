import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterOutlet } from '@angular/router';
import { NavAuthComponent } from 'src/app/components/nav-auth/nav-auth.component';
import { FooterComponent } from 'src/app/components/footer/footer.component';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule,RouterOutlet,NavAuthComponent,FooterComponent ],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {

}
