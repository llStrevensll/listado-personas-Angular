import { Component, OnInit } from '@angular/core';
import { Persona } from '../persona.model';
import { PersonasService } from '../personas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = [];
  
  constructor( 
    private personasService:PersonasService, 
    private router:Router //Servicio de router para nevegar
  ){}
  
  ngOnInit(): void {
    //this.personas = this.personasService.personas;//inicializa el arreglo personas con el arreglo que esta en personasService 
    this.personasService.obtenerPersonas()
    .subscribe(
      (personas: Persona[]) => {
        this.personas = personas;//asignar al arreglo personas, las personas de la BD
        this.personasService.setPersonas(personas);//actualizar arreglo 
      }
    );
  }

  agregar(){
    this.router.navigate(['personas/agregar']);//navegar hacia agregar
  }


}
