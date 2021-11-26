import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor( private router: Router,
               private authService: AuthService ) { }

  ngOnInit(): void {
  }

  login() {

    //Ir al Backend
    //Debe tener un Usuario y estar disponible en un servicio
    this.authService.login()
        .subscribe( resp => {
          console.log(resp);
          
          if( resp.id ) {
            this.router.navigate(['./heroes']);

          }

        })


  }

}
