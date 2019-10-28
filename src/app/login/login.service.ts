import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class LoginService{

    token: string;

    constructor(private router: Router){}
    
    //Autenticarse con email y password
    login(email: string, password: string){
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(//respuesta que incluye el token
                response => {
                    firebase.auth().currentUser.getIdToken().then(
                        token => {
                            //console.log(token);
                            this.token = token;
                            this.router.navigate(['/']);
                        }
                    )
                }
            )
    }
    
    //Obtener token
    getIdToken(){
        return this.token;
    }
    
    //Esta Autenticado
    isAutenticado(){
        return this.token != null;
    }
    
    //Salir de la cuenta
    logout(){
        firebase.auth().signOut().then(() => {
            this.token = null;
            this.router.navigate(['login']);
        }).catch(error => console.log("error logout:" + error));
    }
}