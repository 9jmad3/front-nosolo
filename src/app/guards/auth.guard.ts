import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let auth = false;

      if(this.authService.isLogged){
        auth = true;
      }
  
      return auth;
    }
  
    /**
     * Método para decodificar el token de usuario
     * @param token 
     * @returns 
     */
    getDecodedAccessToken(token: string): any {
      try{
          return jwt_decode(token);
      }
      catch(Error){
          return null;
      }
    }
  
    
    
  }
  function jwt_decode(token: string): any {
    throw new Error('Function not implemented.');
  }









    

