import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RouteService } from 'src/app/services/route/route.service';

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.css']
})
export class ListEventsComponent implements OnInit {
  listRoutes: any[];
  listAllRoutes: any[];
  listRoutesFiltered: any[] = [];
  border;

  filterRouteForm = this.fb.group({
    type: [''],
    status: [''],
  });

  constructor(
              private fb: FormBuilder,
              private router: Router,
              private routeService: RouteService
              ) { }

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes(){
    this.routeService.getAllRoutes()
      .then(res => {      
        let route = res['routes'];
        this.listAllRoutes = route.reverse();
        this.listRoutes = route.reverse();
      })
  }

  filterRoute(){
  
    this.listRoutesFiltered = [];
    let comodin = [];
    let type = this.filterRouteForm.get('type').value
    let status = this.filterRouteForm.get('status').value    

    //FILTER TYPE
      this.listAllRoutes.forEach(element => {
        if (element.type == type || type === "all" || type === "") {
          this.listRoutesFiltered.push(element)
        }
      });
      

      //FYLTER STATUS
      this.listRoutesFiltered.forEach(element => {
        if (element.status === status || status === "all" || status === "") {
          comodin.push(element)
        }
      })

      this.listRoutesFiltered = comodin;
      comodin = [];


      this.listRoutes = this.listRoutesFiltered;
  }

  compare(forOrder : string){
    if (forOrder === "recent") {
      this.listRoutes.sort((b , a) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0))
    } else {
      this.listRoutes.sort((a , b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0))
    }
  }

}
