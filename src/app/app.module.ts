// Importaciones
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuillModule } from 'ngx-quill';
import { ChartsModule } from 'ng2-charts';

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
import { GeneratePqrsComponent } from './components/council/generate-pqrs/generate-pqrs.component';
import { ListPqrsComponent } from './components/council/list-pqrs/list-pqrs.component';
import { GenerateReleaseComponent } from './components/council/generate-release/generate-release.component';
import { ListReleasesComponent } from './components/council/list-releases/list-releases.component';
import { GeneratePaymentComponent } from './components/payment/generate-payment/generate-payment.component';
import { ListPaymentComponent } from './components/payment/list-payment/list-payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoaderComponent } from './components/loader/loader.component';

// Rutas
import { app_routing } from './app.routes';

// Pipes
import { FilterUserPipe } from './pipes/filterUser.pipe';
import { NoSanitizePipe } from './pipes/no-sanitize.pipe';
import { FilterPaymentPipe } from './pipes/filterPayment.pipe';

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
    FilterUserPipe,
    GeneratePqrsComponent,
    ListPqrsComponent,
    GenerateReleaseComponent,
    NoSanitizePipe,
    ListReleasesComponent,
    ProfileComponent,
    GeneratePaymentComponent,
    ListPaymentComponent,
    FilterPaymentPipe,
    LoaderComponent
    ],
  imports: [
    BrowserModule,
    app_routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    QuillModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
