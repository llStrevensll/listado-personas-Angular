import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Persona } from '../../persona.model';
import { LogginService } from '../../LogginService.service';
import { PersonasService } from '../../personas.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  //@Output() personaCreada = new EventEmitter<Persona>(); //Objeto persona - Envia informacion desde el hijo al padre
  nombreInput:string;
  apellidoInput:string;
  index: number;
  modoEdicion: number;
  /* @ViewChild('nombreInput', { static: false }) nombreInput : ElementRef;
  @ViewChild('apellidoInput', { static: false }) apellidoInput:ElementRef; */

  constructor(
              private loggingService:LogginService, 
              private personasService:PersonasService,
              private router:Router,
              private route: ActivatedRoute
              ) {//Instancia de loggingservice (concepto dependency injection)
                  this.personasService.saludar.subscribe(
                      (indice:number) => alert("El indice es: " + indice)
                  ); 
                }

  ngOnInit() {
    this.index = this.route.snapshot.params['id'];//id debe ser el mismo de la ruta definida en routing
    this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];//+ -> convertir string a numberentero
    
    /*if (this.index) {//Si existe el index*/
    if (this.modoEdicion != null && this.modoEdicion === 1) {//Si es diferente a nulo y es igual a 1-> 1:modoEdicion 0->modoAgregar
      //Obtener objeto persona
      let persona: Persona = this.personasService.encontrarPersona(this.index);
      //Lllenar campos
      this.nombreInput = persona.nombre;
      this.apellidoInput = persona.apellido;
    }
  }
  
  onGuardarPersona(){
    let persona1 = new Persona(this.nombreInput, this.apellidoInput);
    //this.loggingService.enviarMensajeAConsola("Enviamos persona con nombre:" + persona1.nombre + " apellido:" + persona1.apellido);
    //this.personaCreada.emit(persona1);
    /*if (this.index) {////Si existe index entonces esta en modo edicion*/
    if (this.modoEdicion != null && this.modoEdicion === 1) {
      this.personasService.modificarPersona(this.index, persona1);
    }else{//sino se esta agregando una nueva persona
      this.personasService.agregarPersona(persona1);
    }
    this.router.navigate(['personas']);

  }

  eliminarPersona(){
    if (this.index != null) {
      this.personasService.eliminarPersona(this.index);
    }
    this.router.navigate(['personas']);
  }

}
