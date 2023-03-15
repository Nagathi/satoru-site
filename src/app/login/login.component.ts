import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { enviroment } from 'enviroment';
import { Usuario } from './usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  img: string = 'https://cdn.discordapp.com/attachments/1085586353812672583/1085586568875618455/satoru-backg.jpeg'
  baseUrl: string = enviroment.baseUrl
  path: string = enviroment.pathListarUsuarios
  userForm!: FormGroup
  usuarios: Usuario[]
  isLogado: Boolean

  constructor(){
    this.usuarios = []
    this.isLogado = false
  }

  ngOnInit(): void{

    this.userForm = new FormGroup({
      id: new FormControl(''),
      user: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    });

    this.findAll()

  }

  get pass(){
    return this.userForm.get('user')!
  }
  get user(){
    return this.userForm.get('pass')!
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

  submit(){
    for(let i = 0; i < this.usuarios.length; i++){

      console.log(this.usuarios[i].usuario)
      console.log(this.usuarios[i].senha)
      console.log(this.userForm.value.user)
      console.log(this.userForm.value.pass)
      if((this.usuarios[i].usuario == this.userForm.value.user) && (this.usuarios[i].senha == this.userForm.value.pass)){
        this.isLogado = true;
        console.log("LOGADO")
      }
    }
  }

}
