import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interfaces';
import { Observable, catchError, map, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor( private http:HttpClient ) { }

  get currentUser():User|undefined {
    if ( !this.user ) return undefined;
    return structuredClone(this.user);
    //return (...this.user);
  }

  login(email: string, password: string): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap( user => {
        this.user = user;
        localStorage.setItem('token', String(user.id))
      })
    )
  }

  checkAuthentication(): Observable<boolean>{
    if(!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');
    console.log(token, 'Token')
    return this.http.get<User>(`${this.baseUrl}/users/1`)
    .pipe(
      tap( user => this.user = user ),
      map( user => !!user ),
      catchError( err => of(false))
    )
  }

  logout(){
    this.user = undefined;
    localStorage.clear();
  }

}
