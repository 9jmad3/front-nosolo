import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RouteService } from 'src/app/services/route/route.service';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

@Component({
  selector: 'app-info-event',
  templateUrl: './info-event.component.html',
  styleUrls: ['./info-event.component.css']
})
export class InfoEventComponent implements OnInit {
  routeId: number;
  title = "titulo";
  type = "tipo";
  cc = "cc";
  km = "km";
  userName = "e";
  userIdRoute = "";
  description = "descripción";
  status = "";
  userId = localStorage.getItem('id');
  date = "";
  hour = "";
  pointed: boolean = false; //Usuario apuntado al evento(?)
  listAssistant: any[]; //Lista de usuarios asistentes con todos sus datos
  listUserAsistant : any[] = []; //Id de los usuarios asistentes

  goRouteForm = this.fb.group({
    id: ['',[Validators.required]],
  });

  constructor(
              private fb: FormBuilder,
              private routeService: RouteService,
              private aRoute: ActivatedRoute,
              private vehicleService: VehicleService,
              private authService: AuthService
              ) {
                const idParam = 'id';
                this.routeId = this.aRoute.snapshot.params[idParam];
              }

  ngOnInit(): void {
    this.getRoute();   
    this.getAssistant();
  }

  getRoute(){
    this.routeService.getRouteById(this.routeId)
      .then(res => {
        this.title = res['route']['title'];
        this.type = res['route']['type'];
        this.cc = res['route']['cc'];
        this.km = res['route']['km'];
        this.description = res['route']['description'];
        this.userName = res['route']['user']['username'];
        this.userIdRoute = res['route']['user']['id'];
        this.status = res['route']['status']
        this.date = res['route']['date']
        this.hour = res['route']['hour']
      })      
  }

  getAssistant(){
    this.routeService.getAssistantByRouteId(this.routeId)
      .then(res => {
        let response = res['assistant'];

        res['assistant'].forEach(element => {
          this.listUserAsistant.push(element.userId.toString())
        });
        
        for (let i = 0; i < this.listUserAsistant.length; i++) {
          const element = this.listUserAsistant[i];
        }

        if (this.listUserAsistant.includes(this.userId)) {
          this.pointed = true;
        }

        this.authService.getAllAssistant(this.listUserAsistant)
          .then(res => {
            let users
            this.listAssistant = res['users'];
          });
        
          
      })
  }

  cancelledRoute(){
    this.routeService.cancelledRoute(this.routeId)
      .then(res => {
        setTimeout(() => {
          this.listAssistant = [];
          this.listUserAsistant = [];
          this.ngOnInit();
        }, 1000);
      })
      .catch(err => console.log(err))
  }

  goRoute(){
    const newAssistant = {
      routeId: this.routeId,
      userId: this.userId
    }

    this.routeService.newAssistant(newAssistant)
      .then(res => {
        setTimeout(() => {
          this.listAssistant = [];
          this.listUserAsistant = [];
          this.ngOnInit();
        }, 1000);
      })
      .catch(err => console.log(err))
  }

  cancelledAsistant(){
    const cancelAssistant = {
      routeId: this.routeId,
      userId: this.userId
    }

    this.routeService.cancelAssistant(cancelAssistant)
      .then(res => {
        setTimeout(() => {
          this.pointed = false;
          this.listAssistant = [];
          this.listUserAsistant = [];
          this.ngOnInit();
        }, 1000);
      })
      .catch(err => console.log(err))
  }

  /**
     * Método para formatear una fecha.
     * @param date 
     * @returns 
     */
   formatDate(date){
    if(date !== undefined && date !== null){
      return `${date.substr(8,2)}/${date.substr(5,2)}/${date.substr(0,4)}`
    }
    return date;
  }
}
