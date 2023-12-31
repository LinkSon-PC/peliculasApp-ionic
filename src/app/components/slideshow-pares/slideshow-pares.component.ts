import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent  implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();

  constructor( private modalCtr:ModalController) { }

  ngOnInit() {}

  onClick(){
    this.cargarMas.emit();
  }

  async verDetalle(id:number){
    const modal = await this.modalCtr.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }
}
