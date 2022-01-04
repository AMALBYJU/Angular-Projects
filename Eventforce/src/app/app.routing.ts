import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { EntryComponent } from './entry/entry.component';

export const AppRoutes: Routes = [{
  path: '',
  component: FullComponent,
  children: [{ 
    path: '', 
    redirectTo: '/starter', 
    pathMatch: 'full' 
  }, {
    path: '',
    loadChildren: './material-component/material.module#MaterialComponentsModule'
  }, {
    path: 'starter',
    loadChildren: './starter/starter.module#StarterModule'
  }]
},
{
  path:"entry",
  component: EntryComponent
},
];

