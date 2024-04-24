import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ MaterialModule, RouterModule],
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

}
