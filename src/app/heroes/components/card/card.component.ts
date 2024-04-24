import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.interface';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroImagePipe } from "../../pipes/hero-image.pipe";

@Component({
    selector: 'hero-card',
    standalone: true,
    templateUrl: './card.component.html',
    styleUrl: './card.component.css',
    imports: [MaterialModule, CommonModule, RouterModule, HeroImagePipe]
})
export class CardComponent implements OnInit {

  @Input()
  public hero!: Hero;


  ngOnInit(): void {
    if ( !this.hero )  throw new Error('Hero property is required.');
  }

}
