import { Component, OnInit, Input } from '@angular/core';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../personas.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  @Input() persona: Persona;//Input recibe informacion del componente padre [persona]
  @Input() indice: number; // [indice]

  constructor(private personasService:PersonasService) { }

  ngOnInit() {
  }
  emitirSaludo(){
    this.personasService.saludar.emit(this.indice);
  
  }

}
