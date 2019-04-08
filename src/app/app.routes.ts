// Importaciones
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';

// Rutas
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { ListUsersComponent } from './components/user/list-users/list-users.component';
import { PqrsComponent } from './components/council/pqrs/pqrs.component';

const app_routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AppGuard] },
    { path: 'dashboard/create-user', component: CreateUserComponent, canActivate: [AppGuard] },
    { path: 'dashboard/list-users', component: ListUsersComponent, canActivate: [AppGuard] },
    { path: 'dashboard/pqrs', component: PqrsComponent, canActivate: [AppGuard] },
    { path: '**', component: NotFoundComponent }
];

export const app_routing = RouterModule.forRoot(app_routes);
