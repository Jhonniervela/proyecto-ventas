import { Component, OnInit } from '@angular/core';
import {PersonaService} from "../../../providers/services/persona.service";

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: any = [];
  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.getPersonas();
  }

  getPersonas(): void {
    this.personaService.getAll$().subscribe(response => {
      this.personas = response.data || [];
      console.log(this.personas);
    });
  }

}
