import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  constructor(private movieService:MoviesService) {}

  ngOnInit(){
    this.movieService.getFeature().subscribe(
      (res) => {
        //console.log('Respuesta', res);
        this.peliculasRecientes = res.results;
      }
    );

    this.getPopulares();
    
  }

  cargarMas(){
    this.getPopulares();
  }

  getPopulares(){
    this.movieService.getPopulares().subscribe(
      resp => {
          const arrTemp = [...this.populares, ...resp.results];
          //console.log('populares', resp)
          this.populares = arrTemp;
      }
    )
  }

}
