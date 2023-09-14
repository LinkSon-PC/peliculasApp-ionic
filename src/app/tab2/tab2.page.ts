import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar:string = '';
  peliculas:Pelicula[] = [];
  buscando:boolean = false;
  ideas:string[] = ['Spiderman','Avenger','El señor de los anillos', 'la vida es bella'];

  constructor(
        private moviesService:MoviesService,
        private modalCtlr: ModalController) {}

  buscar(event:any){
    //console.log(event.detail.value);
    const valor = event.detail.value;

    if ( valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    this.buscando = true;

    this.moviesService.buscarPeliculas(valor).subscribe(
      (res:any) => {
        //console.log(res);
        this.buscando = false;
        this.peliculas = res['results'];
      }
    )
  }

  async detalle(id:number){
    const modal = await this.modalCtlr.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}
