import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './header/dropdown.directive';
import { OverviewComponent } from './overview/overview.component';
import { OrderComponent } from './order/order.component';
import { Routing } from './app.routing';
import { AdminComponent } from './admin/admin.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        DropdownDirective, OverviewComponent, OrderComponent, AdminComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        Routing
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
