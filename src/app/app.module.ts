import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ListEventsComponent } from './components/events/list-events/list-events.component';
import { RootNavComponent } from './components/root-nav/root-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { InfoEventComponent } from './components/events/info-event/info-event.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddEventComponent } from './components/events/add-event/add-event.component';
import { PublicWebComponent } from './components/public-web/public-web.component';
import { AddEditVehiclesComponent } from './components/vehicles/add-edit-vehicles/add-edit-vehicles.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListEventsComponent,
    RootNavComponent,
    InfoEventComponent,
    AddEventComponent,
    PublicWebComponent,
    AddEditVehiclesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
