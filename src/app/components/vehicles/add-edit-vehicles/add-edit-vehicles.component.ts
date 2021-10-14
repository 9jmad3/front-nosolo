import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from 'src/app/services/route/route.service';
import { VehicleService } from 'src/app/services/vehicle/vehicle.service';

@Component({
  selector: 'app-add-edit-vehicles',
  templateUrl: './add-edit-vehicles.component.html',
  styleUrls: ['./add-edit-vehicles.component.css']
})
export class AddEditVehiclesComponent implements OnInit {

  listVehicles: any[];

  addVehicleForm = this.fb.group({
    title: ['',[Validators.required]],
  });

  constructor(
              private fb: FormBuilder,
              private vehicleService: VehicleService,
              private route: Router,
  ) { }

  ngOnInit(): void {
    this.getVehicles();
  }

  saveVehicle(){
    const route = {
      title: this.addVehicleForm.get('title').value,
      userId: localStorage.getItem('id')
    };    

    this.vehicleService.newVehicle(route)
      .then(res => {
        setTimeout(() => {
          this.ngOnInit();
        }, 1000);
      })
      .catch(err => console.log(err))
  }

  getVehicles(){
    this.vehicleService.getVehicleByUserId(localStorage.getItem('id'))
      .then(res => {      
        this.listVehicles = res['vehicles'];
      })
  }

  deleteVehicle(id){
    this.vehicleService.deleteVehicle(id)
    .then(res => {
      setTimeout(() => {
        this.ngOnInit();
      }, 1000);
    })
    .catch(err => console.log(err))
  }

}