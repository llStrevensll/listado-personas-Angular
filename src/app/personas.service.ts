import { Persona } from './persona.model';
import { LogginService } from './LogginService.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()//Decorador en la clase que se va a inyectar el servicio
export class PersonasService{
    personas: Persona[] = [new Persona("Angel", "Rodriguez"), new Persona("Steven", "Castro")];
    saludar = new EventEmitter<number>();

    constructor(private loggingService: LogginService){}

    agregarPersona(persona: Persona){
        this.loggingService.enviarMensajeAConsola("agregamos persona: "+ persona.nombre);
        this.personas.push(persona);
    }

    encontrarPersona(index: number){
      let persona: Persona = this.personas[index];
      return persona;
    }

    modificarPersona(index: number, persona: Persona){
      let persona1 = this.personas[index];//posicion del arreglo donde esta esa persona a modificar
      persona1.nombre = persona.nombre;
      persona1.apellido = persona.apellido;
    }

    eliminarPersona(index:number){
      this.personas.splice(index, 1);//eliminar persona del arreglo
    }
}
