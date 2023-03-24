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
  path: string = enviroment.pathListarPersonagens
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
    this.isLogado = this.service.getLogado();
    this.usuario = this.service.getUsuario()
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
      nome: new FormControl(''),
    });
    
  }

  get nome(){
    return this.searchForm.get('nome')
  }

  buscar(){
    for(let i = 0; i < this.personagens.length;i++){
      if(this.searchForm.value.nome == this.personagens[i].nome){
        console.log(this.personagens[i])
      } 
    }
  }

  sair(){
    this.isLogado = false;
    alert('Você foi desconectado')
  }

  
}
