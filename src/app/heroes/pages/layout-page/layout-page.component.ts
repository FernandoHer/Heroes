import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interfaces';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [ RouterOutlet, MaterialModule, CommonModule, RouterModule],
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  constructor( 
    private authService: AuthService,
    private router: Router
  ){}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  public sidebarItems =[
    { label: 'Listado', icon: 'label', url: './list'},
    { label: 'Añadir', icon: 'add', url: './new-hero'},
    { label: 'Buscar', icon: 'search', url: './search'},
  ]

  logout(){
    this.authService.logout();
    this.router.navigate(['/auth/login'])
  }

}
