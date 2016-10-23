/**
 * Created by Patrick Dawson on 02.10.2016.
 */

import { Routes } from '@angular/router';
import { OverviewDetailComponent } from './overview-detail/overview-detail.component';
import { AuthGuard } from '../shared/auth.guard';
import { CurrentUserGuard } from '../shared/currentUser.guard';

export const OVERVIEW_ROUTES: Routes = [
  { path: ':customer', component: OverviewDetailComponent, canActivate: [AuthGuard, CurrentUserGuard] }
];

