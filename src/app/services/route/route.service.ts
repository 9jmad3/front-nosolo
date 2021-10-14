import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  baseUrl: string;
  headers = new HttpHeaders({'accesstoken':localStorage.getItem('accesstoken')});

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = environment.API_URL;
  }

  /**
   * Método que devuelve todas las familias de la API
   * @returns Array con las familias de la bbdd
   */
   getAllRoutes(): Promise<any[]>{  
    return this.httpClient.get<any[]>(`${this.baseUrl}listRoutes`, {'headers': this.headers}).toPromise();
  }

  getRouteById(index: number){
    return this.httpClient.get<any>(`${this.baseUrl}listRoutes/${index}`, {'headers': this.headers}).toPromise();
  }

  /**
   * Método para crear nuevas familias en la bbdd.
   * @param families array con las nuevas familias
   * @returns 
   */
  newRoute(route){
    return this.httpClient.post<any>(`${this.baseUrl}newRoute`, route, {'headers': this.headers}).toPromise();
  }

  newAssistant(assistant){
    return this.httpClient.post<any>(`${this.baseUrl}newAssistant`, assistant, {'headers': this.headers}).toPromise();
  }

  cancelledRoute(idRoute: number){        
    return this.httpClient.put<any>(`${this.baseUrl}cancelledRoute/${idRoute}`, {'headers': this.headers}).toPromise();
  }

  getAssistantByRouteId(id){
    return this.httpClient.get<any>(`${this.baseUrl}listAssistantByRouteId/${id}`, {'headers': this.headers}).toPromise();
  }

  cancelAssistant(assistant){  
    return this.httpClient.post<any>(`${this.baseUrl}cancelAssistant`, assistant, {'headers': this.headers}).toPromise();
  }
  
}













  

  

  