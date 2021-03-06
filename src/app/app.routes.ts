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
import { GeneratePqrsComponent } from './components/council/generate-pqrs/generate-pqrs.component';
import { ListPqrsComponent } from './components/council/list-pqrs/list-pqrs.component';
import { GenerateReleaseComponent } from './components/council/generate-release/generate-release.component';
import { ListReleasesComponent } from './components/council/list-releases/list-releases.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GeneratePaymentComponent } from './components/payment/generate-payment/generate-payment.component';
import { ListPaymentComponent } from './components/payment/list-payment/list-payment.component';
import { GenerateReservationComponent } from './components/reservations/generate-reservation/generate-reservation.component';
import { ListReservationsComponent } from './components/reservations/list-reservations/list-reservations.component';
import { ConsultReservationComponent } from './components/reservations/consult-reservation/consult-reservation.component';

const app_routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AppGuard] },
    { path: 'dashboard/create-user', component: CreateUserComponent, canActivate: [AppGuard] },
    { path: 'dashboard/list-users', component: ListUsersComponent, canActivate: [AppGuard] },
    { path: 'dashboard/generate-pqrs', component: GeneratePqrsComponent, canActivate: [AppGuard] },
    { path: 'dashboard/list-pqrs', component: ListPqrsComponent, canActivate: [AppGuard] },
    { path: 'dashboard/generate-release', component: GenerateReleaseComponent, canActivate: [AppGuard] },
    { path: 'dashboard/list-release', component: ListReleasesComponent, canActivate: [AppGuard] },
    { path: 'dashboard/profile', component: ProfileComponent, canActivate: [AppGuard] },
    { path: 'dashboard/generate-payment', component: GeneratePaymentComponent, canActivate: [AppGuard] },
    { path: 'dashboard/list-payment', component: ListPaymentComponent, canActivate: [AppGuard] },
    { path: 'dashboard/generate-reservation', component: GenerateReservationComponent, canActivate: [AppGuard] },
    { path: 'dashboard/list-reservation', component: ListReservationsComponent, canActivate: [AppGuard] },
    { path: 'dashboard/consult-reservation', component: ConsultReservationComponent, canActivate: [AppGuard] },
    { path: '**', component: NotFoundComponent }
];

export const app_routing = RouterModule.forRoot(app_routes);
