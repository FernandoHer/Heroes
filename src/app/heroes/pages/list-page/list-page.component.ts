import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../../material/material.module';
import { CardComponent } from "../../components/card/card.component";

@Component({
    selector: 'app-list-page',
    standalone: true,
    templateUrl: './list-page.component.html',
    styles: ``,
    imports: [HttpClientModule, MaterialModule, CardComponent]
})
export class ListPageComponent implements OnInit{

  public heroes: Hero[] = [];

  constructor( private heroesService: HeroesService){}
  
  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes=heroes)  
  }




}
