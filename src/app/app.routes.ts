import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const app_routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent}
];

export const app_routing = RouterModule.forRoot(app_routes);
