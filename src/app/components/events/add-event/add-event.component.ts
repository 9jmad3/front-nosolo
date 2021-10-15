import { getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from 'src/app/services/route/route.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  idEmployee: number;
  accion: string;
  minDate = new Date();

  addRouteForm = this.fb.group({
    title: ['',[Validators.required]],
    type: ['',[Validators.required]],
    cc: ['',[Validators.required]],
    km: ['',[Validators.required]],
    province: ['',[Validators.required]],
    description: ['',[Validators.required]],
    date: ['',[Validators.required]],
    hour: ['',[Validators.required]]
  });
  hide = true;

  constructor(
              private fb: FormBuilder,
              private routeService: RouteService,
              private route: Router,
  ) { }

  ngOnInit(): void {}

  saveRoute(){
    const route = {
      title: this.addRouteForm.get('title').value,
      type: this.addRouteForm.get('type').value,
      province: this.addRouteForm.get('province').value,
      cc: this.addRouteForm.get('cc').value,
      km: this.addRouteForm.get('km').value,
      description: this.addRouteForm.get('description').value,
      date: this.addRouteForm.get('date').value,
      hour: this.addRouteForm.get('hour').value,
      userId: localStorage.getItem('id'),
      status: "active"
    };    

    this.routeService.newRoute(route)
      .then(res => {
        setTimeout(() => {
          this.route.navigate(['/in/events']);
        }, 1000);
      })
      .catch(err => console.log(err))
    
  }
}
