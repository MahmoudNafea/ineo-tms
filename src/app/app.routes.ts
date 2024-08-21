import { Routes } from '@angular/router'
import { DashboardComponent } from './pages/dashboard/dashboard.component'

export const routes: Routes = [
  // { path: '', component: DashboardComponent },
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (mod) => mod.DashboardComponent,
      ),
  },
]
