import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { enviroment } from 'enviroment';
import { LoginService } from '../services/login.service';
import { Usuario } from './usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  img: string = 'https://cdn.discordapp.com/attachments/1085586353812672583/1085586568875618455/satoru-backg.jpeg'
  baseUrl: string = enviroment.baseUrl;
  path: string = enviroment.pathListarUsuarios;
  userForm!: FormGroup;
  usuarios: Usuario[];
  isLogado: boolean;

  constructor(private service: LoginService){
    this.usuarios = []
    this.isLogado = false
  }

  ngOnInit(): void{

    this.userForm = new FormGroup({
      id: new FormControl(''),
      user: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    });

  }

  get pass(){
    return this.userForm.get('user')!
  }
  get user(){
    return this.userForm.get('pass')!
  }


  submit(){
    this.service.login(this.userForm.value.user, this.userForm.value.pass)
  }
}
