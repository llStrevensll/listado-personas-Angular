import { CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginGuardian implements CanActivate{//para usar un guardian es necesario usar canactivate
    
    constructor(private loginService: LoginService,
                private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if (this.loginService.isAutenticado()) {//Si esta autenticado
            return true;
        }
        else{//Sino redirigir a login
            this.router.navigate(['login']);
            return false;//false para que no se muestre la pagina solicitada
        }
    }
}