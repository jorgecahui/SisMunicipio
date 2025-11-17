import { Routes } from '@angular/router';

// ui

import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { CamposExtraidosComponent } from "./document/document.component";
import { EditarDocumentoComponent } from "./document/form/formdocument.component";
import {CrearDocumentoComponent} from "./document/typedocs/typedocs.component";

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'lists', component: AppListsComponent },
      { path: 'menu', component: AppMenuComponent },
      { path: 'forms', component: AppFormsComponent },
      { path: 'tables', component: AppTablesComponent },
      { path: 'document', component: CamposExtraidosComponent },
      { path: 'document/edit/:id', component: EditarDocumentoComponent },
      { path: 'document/delete/:id', component: EditarDocumentoComponent },
      { path: 'document/crear', component: CrearDocumentoComponent },
    ],
  },
];
