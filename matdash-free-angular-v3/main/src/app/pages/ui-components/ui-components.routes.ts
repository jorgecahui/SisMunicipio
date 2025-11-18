import { Routes } from '@angular/router';

// ui

import {  TramiteListComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { TramiteFormComponent} from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { MisTramitesComponent } from "./document/document.component";

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'lists', component: TramiteListComponent },
      { path: 'menu', component: AppMenuComponent },
      { path: 'tramite', component: TramiteFormComponent },
      { path: 'tables', component: AppTablesComponent },
      { path: 'document', component: MisTramitesComponent },
    ],
  },
];
