import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './header/dropdown.directive';
import { OverviewComponent } from './overview/overview.component';
import { OrderComponent } from './order/order.component';
import { Routing } from './app.routing';
import { AdminComponent } from './admin/admin.component';
import { MealService } from './services/meal.service';
import { OrderService } from './services/order.service';
import { OverviewListComponent } from './overview/overview-list/overview-list.component';
import { OverviewDetailComponent } from './overview/overview-detail/overview-detail.component';
import { SignupComponent } from './header/signup/signup.component';
import { AuthService } from './services/auth.service';
import { SigninComponent } from './header/signin/signin.component';
import { AuthGuard } from './shared/auth.guard';
import { CurrentUserGuard } from './shared/currentUser.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    OverviewComponent,
    OrderComponent,
    AdminComponent,
    OverviewListComponent,
    OverviewDetailComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    Routing,
  ],
  providers: [
    MealService,
    OrderService,
    AuthService,
    AuthGuard,
    CurrentUserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
