import { Component } from '@angular/core';
import {DeseosService} from '../../services/deseos.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {Lista} from '../../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  listas: any[];
  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) {
    this.listas = deseosService.listas;
  }

  async agregarLista() {
    const alert = await this.alertCtrl.create({
      header: 'Crear',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.titulo.length === 0) {
              return;
            }
            const listaId = this.deseosService.crearLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
          }
        }
      ]
    });
    alert.present();
  }
  listaSeleccionada(lista: Lista) {
    this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
  }
  borrar(i) {
    this.listas.splice(i, 1);
    this.deseosService.guardarStorage();
  }
}
