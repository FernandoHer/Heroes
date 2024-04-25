import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { HeroImagePipe } from "../../pipes/hero-image.pipe";
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-new-page',
    standalone: true,
    templateUrl: './new-page.component.html',
    styles: ``,
    imports: [MaterialModule, ReactiveFormsModule, HeroImagePipe]
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),               
    superhero: new FormControl<string>('', { nonNullable: true }),       
    publisher:  new FormControl<Publisher>(Publisher.DCComics),      
    alter_ego: new FormControl(''),       
    first_appearance: new FormControl(''),
    characters: new FormControl(''),      
    alt_img: new FormControl(''),        
  })

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics'},
    { id: 'Marvel Comics', desc: 'Marvel - Comics'}
  ]

  constructor( 
    private heroesService: HeroesService,
    private activateRouter: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ){}
  
  
  ngOnInit(): void {
    if( !this.router.url.includes('edit')) return;

    this.activateRouter.params
      .pipe(
        switchMap( ({ id }) =>  this.heroesService.getHeriById( id)),
      ).subscribe( hero => {
        if( !hero ){ return this.router.navigateByUrl('/')}

        return this.heroForm.reset( hero );
      })
  }

  get currentHero():Hero {
    const hero = this.heroForm.value as Hero;
    return hero
  }

  onSubmit(){
    console.log("FORMATO DE HERO",this.heroForm.valid)
   if ( this.heroForm.invalid ) return;
   if ( this.currentHero.id ) {
    this.heroesService.updateHero( this.currentHero)
    .subscribe( hero => {
      this.showSnackbar(`${hero.superhero} Actualizado`);
    });
    return;
 }
    this.heroesService.addHero( this.currentHero )
      .subscribe(hero => {
        this.showSnackbar(`${hero.superhero} Creado `);
        this.router.navigateByUrl('/');
      })
  }

  onDeleteHero(){
    if ( !this.currentHero.id ) throw Error('Hero id es requerido');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

    dialogRef.afterClosed().subscribe(result => {
      if ( !result ) return;
      this.heroesService.deleteHeroById( this.currentHero.id)
      .subscribe( wasDeleted => {
        if (wasDeleted) this.router.navigateByUrl('/');
      });
      
    })

  }

  showSnackbar( message: string ):void {
    this.snackbar.open ( message, 'hecho', {
      duration: 2500,
    })
  }

}
