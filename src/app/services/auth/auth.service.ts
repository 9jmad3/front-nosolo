import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from 'src/app/models/user-interface';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  username = "Usuario";
  userId = null;
  headers = new HttpHeaders({'accesstoken':localStorage.getItem('accesstoken')});

  constructor(private httpClient: HttpClient,
              private router: Router,) 
              { 
                this.checkToken();
              }

  registerUser(user: any){
    return this.httpClient.post<any>(`${environment.API_URL}newUser`, user).toPromise();
  }

  setUser(user: any){
    localStorage.setItem('name', user.user.name);
    localStorage.setItem('id', user.user.id);
    this.userId = this.getUserId()
  }

  getUsername(){
    return localStorage.getItem('name');
  }

  getUserId(){
    let token: any = jwt_decode(localStorage.getItem("accesstoken"));
    return token.user.id;
  }

  getAllAssistant(usersId : any[]){
    return this.httpClient.post<any>(`${environment.API_URL}listInfoAssistant`,usersId, {'headers': this.headers}).toPromise();
  }

  get isLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  /**
   * Método para saber si es administrador
   */
  get isAdmin(): boolean{
    let token: any = jwt_decode(localStorage.getItem("accesstoken"));

    if(token.user.rol_id === 1){
      return true;
    }else{
      return false;
    }
  }

  get idLoggin(): string{
    let token: any = jwt_decode(localStorage.getItem("accesstoken"));
    return token.user.id;
  }

  login(authData: User){
    return this.httpClient.post<any>(`${environment.API_URL}auth/signin`, authData).toPromise();
  }

  /**
   * Método para deslogearse de la app.
   */
  logout():void{
    localStorage.removeItem('accesstoken');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    this.loggedIn.next(false);

    this.router.navigate(['/']); 
  }

  setLoggedIn(boolean):void{
    this.loggedIn.next(boolean);
  }


  private checkToken():void{
    const userToken = localStorage.getItem('accesstoken'); //Recuperamos el token.
    const isExpired = helper.isTokenExpired(userToken); //Comprobamos si ha expirado.
    this.username = localStorage.getItem('name');
    //SI EL TOKEN ES VALIDO DEVUELVE FALSE.
    isExpired ? this.logout() : this.loggedIn.next(true);

  }

  /**
   * Método para guardar el token.
   * @param token 
   */
  saveToken(token: string):void{
    localStorage.setItem('accesstoken', token)
  }
}

