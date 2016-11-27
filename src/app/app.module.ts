import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule, DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';

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
import { AuthGuard, CurrentUserGuard, OrderGuard } from './shared';
import { MealOfWeekSelectorComponent } from './admin/meal-of-week-selector/meal-of-week-selector.component';
import { MustardSelectionComponent } from './overview/mustard-selection/mustard-selection.component';
import { SwitchComponent } from './admin/switch/switch.component';
import { ClosedBannerComponent } from './closed-banner/closed-banner.component';
import { FooterComponent } from './footer/footer.component';

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
    SigninComponent,
    MealOfWeekSelectorComponent,
    MustardSelectionComponent,
    SwitchComponent,
    ClosedBannerComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    Routing,
    ModalModule,
    DropdownModule
  ],
  providers: [
    AuthService,
    MealService,
    OrderService,
    AuthGuard,
    CurrentUserGuard,
    OrderGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
