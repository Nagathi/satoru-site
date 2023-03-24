import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { enviroment } from 'enviroment';
import { HttpClient } from '@angular/common/http'
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  img: string = 'https://cdn.discordapp.com/attachments/1085586353812672583/1085586568875618455/satoru-backg.jpeg'
  userForm!: FormGroup;
  baseUrl: string = enviroment.baseUrl;
  path = enviroment.pathCadastrarUsuarios;
  readonly APIURL: string
  isLogado: boolean;

  constructor(
                private http: HttpClient,
                private service: LoginService,
                private router: Router
              ){
    this.APIURL = this.baseUrl
    this.isLogado = false
  }

  ngOnInit(): void{
    this.userForm = new FormGroup({
      
      id: new FormControl(''),
      user: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      tipo: new FormControl('')

    });

  }

  
  get user(){
    return this.userForm.get('user')!
  }
  get pass(){
    return this.userForm.get('pass')!
  }
  get email(){
    return this.userForm.get('email')!
  }
  get name(){
    return this.userForm.get('name')!
  }

  cadastrar(){

    this.isLogado = this.service.getLogado();

    if(!this.isLogado){
      const objUsuario = {
        codigo: '',
        nome: this.userForm.value.name,
        email: this.userForm.value.email,
        usuario: this.userForm.value.user,
        senha: this.userForm.value.pass,
        tipo: '1'
      }

      this.http.post(`${ this.APIURL }/${this.path}`, objUsuario).subscribe();

        this.isLogado = true;
        this.service.setLogado(true)
        this.service.emitirStatus.emit(this.isLogado)
        this.router.navigate(['/home'])
    }
  

  }

}
