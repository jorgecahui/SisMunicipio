import { Routes } from '@angular/router';

// ui

import {  TramiteListComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { TramiteFormComponent} from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import { CamposExtraidosComponent } from "./document/document.component";
import { EditarDocumentoComponent } from "./document/form/formdocument.component";
import {CrearDocumentoComponent} from "./document/typedocs/typedocs.component";
import {VisorComponent} from "./document/visor/visor.component";

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      { path: 'lists', component: TramiteListComponent },
      { path: 'menu', component: AppMenuComponent },
      { path: 'tramite', component: TramiteFormComponent },
      { path: 'tables', component: AppTablesComponent },
      { path: 'visor/:documentoId', component: VisorComponent},
      { path: 'document', component: CamposExtraidosComponent },
      { path: 'document/edit/:id', component: EditarDocumentoComponent },
      { path: 'document/delete/:id', component: EditarDocumentoComponent },
      { path: 'document/crear', component: CrearDocumentoComponent },
    ],
  },
];
