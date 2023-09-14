import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent  implements OnInit {
  @Input() id: number = 0;
  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];

  oculto: number = 150;
  existe: boolean = false;

  constructor(
              private moviesService:MoviesService,
              private modalCtrl: ModalController,
              private dataLocal:DataLocalService) { }

  async ngOnInit() {
    //console.log('ID', this.id)

    this.existe = await this.dataLocal.exstePelicula(this.id);
    //console.log('Existe pelicula: ', this.existe);

    this.moviesService.getPeliculaDetalle(this.id).subscribe(
      res => {
          //console.log(res);
          this.pelicula = res;
      }
    );

    this.moviesService.getActorePelicula(this.id).subscribe(
      res => {
          //console.log(res);
          this.actores = res.cast;
      }
    )
  }

  regresar(){
    this.modalCtrl.dismiss();
  }

  favorito(){
    this.existe = this.dataLocal.guardarPelicula(this.pelicula);
  }

}
