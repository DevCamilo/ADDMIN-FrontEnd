// Importaciones
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// Componentes
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { ListUsersComponent } from './components/user/list-users/list-users.component';
import { PqrsComponent } from './components/council/pqrs/pqrs.component';


// Rutas
import { app_routing } from './app.routes';

// Pipes
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    SideNavComponent,
    NotFoundComponent,
    CreateUserComponent,
    ListUsersComponent,
    FilterPipe,
    PqrsComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
