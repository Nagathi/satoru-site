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

  constructor(private http: HttpClient
  ) { }

  findAll(){
    this.http.get<any[]>(`${this.APIURL}/personagens/listar_personagens`)
    .subscribe(
      response => {
        this.saveAll(response)
      },
    );
  }

  saveAll(response: Personagem[]){
    for(let i = 0; i < response.length; i++){
      this.personagens[i] = response[i]
    }
    this.emitirPersonagem.emit(this.personagens) 
  }

}
