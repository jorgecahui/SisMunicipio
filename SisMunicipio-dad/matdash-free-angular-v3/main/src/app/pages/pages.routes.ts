import { Routes } from '@angular/router';
import {CamposExtraidosComponent} from "./ui-components/document/document.component";
export const PagesRoutes: Routes = [
  {
    path: '',
    component: CamposExtraidosComponent,
    data: {
      title: 'Starter',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Starter' },
      ],
    },
  },
];
