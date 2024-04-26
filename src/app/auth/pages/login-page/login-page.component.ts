import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ MaterialModule, RouterModule],
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  constructor( 
    private authService: AuthService,
    private route: Router,
   ){}

  onLogin():void {
    this.authService.login('juanf.herdoiza@gmail.com', '123456')
    .subscribe(user => {
      this.route.navigate(['/']);
    })
  }

}
