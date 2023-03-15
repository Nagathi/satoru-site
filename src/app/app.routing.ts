import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
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
];

export const roteando = RouterModule.forRoot(APP_ROUTES);