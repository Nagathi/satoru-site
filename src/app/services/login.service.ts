import { EventEmitter, Injectable } from '@angular/core';
import { enviroment } from 'enviroment';
import { Usuario } from '../login/usuario.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = enviroment.baseUrl;
  path: string = enviroment.pathListarUsuarios;
  usuarios: Usuario[];

  isLogado: boolean;
  usuario = {
    codigo: '',
    nome: '',
    email: '',
    usuario: '',
    senha: '',
    tipo: ''
  }

  emitirStatus = new EventEmitter<boolean>();
  emitirUsuario = new EventEmitter<Object>();


  constructor(private router: Router) { 

    this.usuarios = []
    this.isLogado = false
    this.findAll();
    
  }

  ngOnInit() {
  }

  findAll(){
    fetch(`${this.baseUrl}/${this.path}`)
    .then(retorno => retorno.json())
    .then(retorno => this.saveAll(retorno))
  }

  saveAll(retorno: Usuario[]){
    for(let i = 0; i < retorno.length; i++){
      this.usuarios[i] = retorno[i]
    }
  }

  login(usuario: string, senha: string){
    for(let i = 0; i < this.usuarios.length; i++){
      if((this.usuarios[i].usuario == usuario) && (this.usuarios[i].senha == senha)){

        const objUsuario = {
          codigo: this.usuarios[i].id,
          nome: this.usuarios[i].nome,
          email: this.usuarios[i].email,
          usuario: this.usuarios[i].usuario,
          senha: this.usuarios[i].senha,
          tipo: this.usuarios[i].tipo
        }

        this.isLogado = true;
        this.router.navigate(['/home'])
        this.emitirUsuario.emit(objUsuario);
        this.emitirStatus.emit(this.isLogado)
      }
    }
  }

  getLogado(){
    return this.isLogado
  }

  getUsuario(){
    return this.usuario
  }

  setLogado(valor: boolean){
    this.isLogado = valor
  }

}
