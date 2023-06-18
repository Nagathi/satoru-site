import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'enviroment';
import { Personagem } from '../home/personagem.model';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {
  btnSelect: boolean = true;
  persoForm!: FormGroup;
  APIURL: string = enviroment.baseUrl
  path: string = enviroment.pathCadastrarPersonagens
  path2: string = enviroment.pathListarPersonagens
  path3: string = enviroment.pathEditarPersonagens
  personagens: Personagem[] = []
  
  constructor( private http: HttpClient){
    this.findAll()
  }

  ngOnInit(){
    this.persoForm = new FormGroup({
      
      codigo: new FormControl(''),
      imagem: new FormControl(''),
      nome: new FormControl(''),
      anime: new FormControl(''),

    });
  }

  get foto(){
    return this.persoForm.get('imagem')!
  }
  get nome(){
    return this.persoForm.get('nome')!
  }
  get anime(){
    return this.persoForm.get('anime')!
  }

  enviar(){

    const objPersonagem = {
      codigo: '',
      imagem: this.persoForm.value.imagem,
      nome: this.persoForm.value.nome,
      anime: this.persoForm.value.anime
    }

    this.http.post(`${this.APIURL}/personagens/${this.path}`, objPersonagem).subscribe(
      retorno => console.log(retorno)
    )
  }

  findAll(){
    fetch(`${this.APIURL}/personagens/${this.path2}`)
    .then(retorno => retorno.json())
    .then(retorno => this.saveAll(retorno))
  }

  saveAll(retorno: Personagem[]){
    for(let i = 0; i < retorno.length; i++){
      this.personagens[i] = retorno[i]
    }
  }
  
  selecionar(indice: any){
    for(let i = 0; i < this.personagens.length; i++){
      if(this.personagens[i].codigo == indice){
        const newObj = {
          codigo: this.personagens[i].codigo,
          imagem: this.personagens[i].imagem,
          nome: this.personagens[i].nome,
          anime: this.personagens[i].anime
        }
        this.persoForm.setValue(newObj)
      }
    }
  }
  
  deletar(){
    
  }
  
  alterar(){

    const objPersonagem = {
      codigo: this.persoForm.value.codigo,
      imagem: this.persoForm.value.imagem,
      nome: this.persoForm.value.nome,
      anime: this.persoForm.value.anime
    }

    this.http.put(`${this.APIURL}/${this.path3}`, objPersonagem).subscribe()
  }

} 