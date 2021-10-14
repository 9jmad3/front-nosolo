import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEventComponent } from './components/events/add-event/add-event.component';
import { InfoEventComponent } from './components/events/info-event/info-event.component';
import { ListEventsComponent } from './components/events/list-events/list-events.component';
import { LoginComponent } from './components/login/login.component';
import { PublicWebComponent } from './components/public-web/public-web.component';
import { RootNavComponent } from './components/root-nav/root-nav.component';
import { AddEditVehiclesComponent } from './components/vehicles/add-edit-vehicles/add-edit-vehicles.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: 'register', component: PublicWebComponent},
  {path: '', component: LoginComponent},
  {path: 'in', component: RootNavComponent, canActivate: [AuthGuard], children:[
    {path: 'events', component: ListEventsComponent, canActivate: [AuthGuard]},
    {path: 'events/info/:id', component: InfoEventComponent, canActivate: [AuthGuard]},
    {path: 'events/add', component: AddEventComponent, canActivate: [AuthGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
