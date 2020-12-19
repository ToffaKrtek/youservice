import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent} from './login-page/login-page.component';
import { AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component'
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { RegisterPageComponent} from './register-page/register-page.component'
import { AuthGuard } from './shared/classes/auth.guard';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { LocationPageComponent } from './location-page/location-page.component';
import { OrdersFormComponent } from './orders-page/orders-form/orders-form.component';
import { UsersFormComponent } from './users-page/users-form/users-form.component';
import { AdminGuard } from './shared/classes/admin.guard';

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent }
    ]
  },
  {
    path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'overview', component: OverviewPageComponent, canActivate: [ AdminGuard] },
      { path: 'orders', component: OrdersPageComponent, canActivate: [ AdminGuard] },
      { path: 'orders/new', component: OrdersFormComponent },
      { path: 'orders/:id', component: OrdersFormComponent, canActivate: [ AdminGuard] },
      { path: 'users', component: UsersPageComponent, canActivate: [ AdminGuard] },
      { path: 'users/new', component: UsersFormComponent },
      { path: 'users/:id', component: UsersFormComponent, canActivate: [ AdminGuard] },
      { path: 'location', component: LocationPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
