import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  //Se pone pure en false, para que se ejcute las veces que necesite, ya que el objeto viene sin nada y luego al crear algo nuevo, entonces se ejecuta de nuevo porq cambio el heroe...es decri que cada que se haga un cambipo se va a disparar ese evento...es mejor dejarlo sin eso o en true
  //pure: false // pero no es necesario
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroe): string {

    if( !heroe.id && !heroe.alt_img ) {
      return 'assets/no-image.png'
    } else if( heroe.alt_img ) {
      return heroe.alt_img;
    }else {
      return `assets/heroes/${ heroe.id }.jpg`;
    }

    

    //assets/heroes/${ heroe.id }.jpg
  }

}
