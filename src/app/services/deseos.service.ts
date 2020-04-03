import { Injectable } from '@angular/core';
import {Lista} from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  listas: Lista[] = [];
  constructor() {
    this.cargarStorage();
  }

  crearLista(titulo: string) {
    const lista = new Lista(titulo);
    this.listas.push(lista);
    this.guardarStorage();
    return lista.id;
  }

  obtenerLista(id: string|number) {
    id = Number(id);
    return this.listas.find( listaData => listaData.id === id );
  }

  guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  cargarStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
  }

  borrarLista( lista: Lista) {
    this.listas = this.listas
        .filter( listaData => listaData.id !== lista.id);
    this.guardarStorage();
  }

}
