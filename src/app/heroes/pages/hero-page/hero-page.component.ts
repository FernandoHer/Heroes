import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { HeroImagePipe } from "../../pipes/hero-image.pipe";

@Component({
    selector: 'app-hero-page',
    standalone: true,
    templateUrl: './hero-page.component.html',
    styles: ``,
    imports: [MaterialModule, CommonModule, HeroImagePipe]
})
export class HeroPageComponent implements OnInit {
  

  public hero?:Hero;

  constructor( 
    private heroesServices: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        delay(500),
        switchMap( ({id}) => this.heroesServices.getHeriById( id ))
      )
      .subscribe( hero => {
        if ( !hero ) return this.router.navigate(['/heroes/list']);

        return this.hero = hero;

      })
    
  }

  goBack(){
    this.router.navigateByUrl('heroes/list');
  }

}
