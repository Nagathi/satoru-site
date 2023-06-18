import { EventEmitter, Injectable } from '@angular/core';
import { enviroment } from 'enviroment';
import { Usuario } from '../login/usuario.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl: string = enviroment.baseUrl;
  path: string = enviroment.pathListarUsuarios;
  usuarios: Usuario[];

  isLogado: boolean;

  emitirStatus = new EventEmitter<boolean>();
  emitirUsuario = new EventEmitter<Usuario>();


  constructor(private router: Router,
              private http: HttpClient) { 

    this.usuarios = []
    this.isLogado = false
    
  }

  ngOnInit() {
  }

  login(usuario: string, senha: string){
    this.http.get<Usuario>(`${this.baseUrl}/login?usuario=${usuario}&senha=${senha}`)
    .subscribe(
      response => {

        const objUsuario: Usuario = {
          id: response.id,
          nome: response.nome,
          email: response.email,
          usuario: response.usuario,
          senha: response.senha,
          tipo: response.tipo
        }

        this.isLogado = true;
        this.router.navigate(['/home'])
        this.emitirStatus.emit(this.isLogado)
        this.emitirUsuario.emit(objUsuario)
      },
    );

  }

  getLogado(){
    return this.isLogado
  }

  setLogado(valor: boolean){
    this.isLogado = valor
  }

}
