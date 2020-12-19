import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginPageComponent } from './login-page/login-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { TokenInterceptor } from './shared/classes/token.interceptor';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { LocationPageComponent } from './location-page/location-page.component';
import { AngularOpenlayersModule } from 'ngx-openlayers';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { OrdersFormComponent } from './orders-page/orders-form/orders-form.component';
import { UsersFormComponent } from './users-page/users-form/users-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    OrdersPageComponent,
    UsersPageComponent,
    LocationPageComponent,
    LoaderComponent,
    OrdersFormComponent,
    UsersFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularOpenlayersModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
