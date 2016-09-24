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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    OverviewComponent,
    OrderComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    Routing
  ],
  providers: [
    MealService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
