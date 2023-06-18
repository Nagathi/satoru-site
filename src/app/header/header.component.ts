import { Component} from '@angular/core';
import { LoginService } from '../services/login.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { enviroment } from 'enviroment';
import { Personagem } from '../home/personagem.model';
import { PersonagemService } from '../services/personagem.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  searchForm!: FormGroup;
  APIURL: string = enviroment.baseUrl
  userForm!: FormGroup;
  isLogado: boolean;
  personagens: Personagem[] = []
  usuario: any = {
    codigo: '',
    nome: '',
    email: '',
    usuario: '',
    senha: '',
    tipo: ''
  }


  constructor(private service: LoginService,
              private personagem: PersonagemService,
              private http: HttpClient){
    this.isLogado = false;

  }

  ngOnInit(){
    this.service.emitirUsuario.subscribe(
      value => this.usuario = value
    )
    this.service.emitirStatus.subscribe(
      value => this.isLogado = value
    );
    this.personagem.emitirPersonagem.subscribe(
      value => this.personagens = value
    )
    this.searchForm = new FormGroup({
      string: new FormControl(''),
    });
    
  }

  get string(){
    return this.searchForm.get('string')
  }

  buscar(){
    this.findAllByNome(this.searchForm.value.string)
    this.findAllByAnime(this.searchForm.value.string)
  }

  findAllByNome(string: string){
    this.http.get<any[]>(`${this.APIURL}/personagens/buscar_nome?nome=${string}`)
    .subscribe(
      response => {
        this.personagem.saveAll(response)
        // Faça algo com os produtos retornados
      },
    );
  }

  findAllByAnime(string: string){
    this.http.get<any[]>(`${this.APIURL}/personagens/buscar_anime?anime=${string}`)
    .subscribe(
      response => {
        this.personagem.saveAll(response)
        // Faça algo com os produtos retornados
      },
    );
  }

  saveAll(response: Personagem[]){
    for(let i = 0; i < response.length; i++){
      this.personagens[i] = response[i]
    }  
  }

  sair(){
    this.isLogado = false;
    alert('Você foi desconectado')
  }

  
}
