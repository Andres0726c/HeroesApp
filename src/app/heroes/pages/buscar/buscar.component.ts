import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor( private heroesServices: HeroesService ) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroesServices.getSugerencias( this.termino.trim() )
        .subscribe( heroes => this.heroes = heroes );
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {

    if(!event.option.value) {
      // console.log('no hay valor');
      this.heroeSeleccionado = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    // console.log(event.option.value);

    this.heroesServices.getHeroePorId(heroe.id!)// le estoy diciendo que siempre va avenir un valor
        .subscribe( heroe => this.heroeSeleccionado = heroe );
  }

}
