import { Routes, RouterModule } from "@angular/router";
import { CadastrarComponent } from "./cadastrar/cadastrar.component";
import { HomeComponent } from "./home/home.component";
import { LoggoutComponent } from "./loggout/loggout.component";
import { LoginComponent } from "./login/login.component";
import { SigninComponent } from "./signin/signin.component";

const APP_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent 
    },
    {
        path: 'login',
        component: LoginComponent 
    },
    {
        path: 'signin',
        component: SigninComponent 
    },
    {
        path: 'loggout',
        component: LoggoutComponent 
    },
    {
        path: 'cadastrar_personagens',
        component: CadastrarComponent 
    },
];

export const roteando = RouterModule.forRoot(APP_ROUTES);