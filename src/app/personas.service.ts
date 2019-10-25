import { Persona } from './persona.model';
import { LogginService } from './LogginService.service';
import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from './data.services';

@Injectable()//Decorador en la clase que se va a inyectar el servicio
export class PersonasService{
    //personas: Persona[] = [new Persona("Angel", "Rodriguez"), new Persona("Steven", "Castro")];
    personas: Persona[] = [];
     
    saludar = new EventEmitter<number>();

    constructor(private loggingService: LogginService,
                private dataServices: DataService
              ){}
    
    
    
    obtenerPersonas(){
      return this.dataServices.cargarPersonas();
    }

    //Actualizar arreglo
    setPersonas(personas: Persona[]){
      this.personas = personas;
    }

    agregarPersona(persona: Persona){
        this.loggingService.enviarMensajeAConsola("agregamos persona: "+ persona.nombre);
        if (this.personas == null) {//En caso que no se encuentre inf
          this.personas = [];
        }
        this.personas.push(persona);
        //Guardar en la bd
        this.dataServices.guardarPersonas(this.personas);
    }

    encontrarPersona(index: number){
      let persona: Persona = this.personas[index];
      return persona;
    }

    modificarPersona(index: number, persona: Persona){
      let persona1 = this.personas[index];//posicion del arreglo donde esta esa persona a modificar
      persona1.nombre = persona.nombre;
      persona1.apellido = persona.apellido;
      //Modificar en la BD
      this.dataServices.modificarPersona(index, persona);
    }

    eliminarPersona(index:number){
      this.personas.splice(index, 1);//eliminar persona del arreglo
      //Eliminar en la BD
      this.dataServices.eliminarPersona(index);

      //Cargar de nuevo el arreglo en la BD para regenerar los indices
      this.modificarPersonas();
    }

    modificarPersonas(){//guardar de nuevo el arreglo
      if (this.personas != null) {
        this.dataServices.guardarPersonas(this.personas);
      }
    }
}
