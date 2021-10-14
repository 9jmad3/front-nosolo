import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  baseUrl: string;
  headers = new HttpHeaders({'accesstoken':localStorage.getItem('accesstoken')});

  constructor(private httpClient: HttpClient) { 
    this.baseUrl = environment.API_URL;
  }

  getVehicleByUserId(id){
    return this.httpClient.get<any>(`${this.baseUrl}listVehiclesByUserId/${id}`, {'headers': this.headers}).toPromise();
  }

  newVehicle(vehicle){
    return this.httpClient.post<any>(`${this.baseUrl}newVehicle`, vehicle, {'headers': this.headers}).toPromise();
  }

  deleteVehicle(id){
    return this.httpClient.delete<any>(`${this.baseUrl}deleteVehicle/${id}`, {'headers': this.headers}).toPromise();
  }
}
