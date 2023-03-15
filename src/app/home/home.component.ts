import { Component } from '@angular/core';
import { enviroment } from 'enviroment';
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
  constructor(){
    this.personagens = []
  }

  ngOnInit(){
    this.findAll();
  }

  listar_personagens(retorno: Personagem[]){
    for(let i = 0; i < retorno.length; i++){
      this.personagens[i] = retorno[i]
    }
  }

  findAll(){
    fetch(`${this.baseUrl}/${this.pathListarPersonagens}`)
    .then(retorno => retorno.json())
    .then(retorno => this.listar_personagens(retorno))
    
  }
 
}
