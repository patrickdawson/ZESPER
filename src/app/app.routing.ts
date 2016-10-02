/**
 * Created by Patrick Dawson on 18.09.2016.
 */
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { OrderComponent } from './order/order.component';
import { AdminComponent } from './admin/admin.component';
import { OVERVIEW_ROUTES } from './overview/overview.routes';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/overview', pathMatch: 'full'},
    { path: 'overview', component: OverviewComponent },
    { path: 'overview', component: OverviewComponent, children: OVERVIEW_ROUTES },
    { path: 'order', component: OrderComponent },
    { path: 'admin', component: AdminComponent }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
