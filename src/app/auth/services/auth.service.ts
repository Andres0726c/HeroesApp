import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! } 
  }

  constructor( private http: HttpClient ) { }

  verificaAutenticacion(): Observable<boolean> { // | boolean

    if( !localStorage.getItem('token') ) {
      return of(false); // falase
    }

    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
               .pipe(
                 map( auth => {
                   this._auth = auth;
                   return true;
                 })// como la funcion retorna un observable<boolean> y el return es de tipo <Auth>, entonces con el map transformamos lo quea que se reciba y retorna un nuevo valor
               );

  }

  login() {
    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)
                .pipe(
                  tap( auth => this._auth = auth ),
                  tap( auth => localStorage.setItem('token', auth.id) )
                );
  }

}
