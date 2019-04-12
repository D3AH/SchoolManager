import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  public nombre: string;
  public segundoNombre: string;
  public apellido: string;
  public segundoApellido: string;
  public apellidoCasada: string;
  public fechaNacimiento: string;
  public religión: string;
  public email: string;
  public genero: string;
  public departamento: string;
  public municipio: string;
  public zona: string;
  public colonia: string;
  public avenida: string;
  public calle: string;
  public sector: string;
  public numeroCasa: string;
  public celular: number;
  public domicilio: number;
  public otro: number;
  
  constructor() {
  }

  ngOnInit() {
  }
}