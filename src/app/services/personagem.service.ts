import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { enviroment } from 'enviroment';
import { Personagem } from '../home/personagem.model';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonagemService {

  APIURL: string = enviroment.baseUrl
  path: string = enviroment.pathListarPersonagens
  personagens: Personagem[] = []
  emitirPersonagem = new EventEmitter<Personagem[]>()

  constructor(
  ) { }

  findAll(){
    fetch(`${this.APIURL}/${this.path}`)
    .then(retorno => retorno.json())
    .then(retorno => this.saveAll(retorno))
  }

  saveAll(retorno: Personagem[]){
    for(let i = 0; i < retorno.length; i++){
      this.personagens[i] = retorno[i]
    }  
    this.emitirPersonagem.emit(this.personagens)
  }

}
