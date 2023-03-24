import { Component } from '@angular/core';
import { enviroment } from 'enviroment';
import { PersonagemService } from '../services/personagem.service';
import { Personagem } from './personagem.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  inputs: ['nome']
})
export class HomeComponent {

  baseUrl: string = enviroment.baseUrl;
  pathListarPersonagens: string = enviroment.pathListarPersonagens;

  personagens: Personagem[]
  constructor(
    private personagem: PersonagemService
  ){
    this.personagens = []
  }

  ngOnInit(){
    this.findAll();
    this.listar()
  }

  listar(){
    this.personagem.emitirPersonagem.subscribe(
      value => this.personagens = value
    )
  }

  findAll(){
    this.personagem.findAll()
  }
 
}
