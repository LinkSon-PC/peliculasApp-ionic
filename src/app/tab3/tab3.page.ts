import { Component, OnInit } from '@angular/core';
import { Genre, Pelicula, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{
  peliculas:PeliculaDetalle[] = [];
  generos:Genre[] = [];

  favoritoGenero:any[] = [];

  constructor(
      private dataLocal:DataLocalService,
      private movisService:MoviesService
  ) {}


  async ionViewWillEnter(){
    this.peliculas = await this.dataLocal.cargarFavoritos();
    //console.log(this.peliculas)
    this.generos = await this.movisService.cargarGeneros();

    this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero(generos: Genre[], pelicualDetalle: PeliculaDetalle[]){
    this.favoritoGenero = [];

    generos.forEach(genero => {
      this.favoritoGenero.push({
        genero: genero.name,
        pelis: this.peliculas.filter(
          peli => {
            return peli.genres?.find( genre => genre.id === genero.id);
          }
        )
      })
    });

    //console.log(this.favoritoGenero);
  }

}
