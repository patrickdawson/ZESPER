/**
 * Created by Patrick Dawson on 18.09.2016.
 */
import { Routes, RouterModule } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { OrderComponent } from './order/order.component';
import { AdminComponent } from './admin/admin.component';

const APP_ROUTES: Routes = [
    { path: '', component: OverviewComponent },
    { path: 'order', component: OrderComponent },
    { path: 'admin', component: AdminComponent }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
