import { NavItem } from './nav-item/nav-item';
import 'iconify-icon';


export const navItems = [
  {
    navCap: 'Trámite Documentario'
  },
  {
    displayName: 'Nuevo Trámite',
    iconName: 'file-upload',
    route: '/ui-components/tramite'
  },
  {
    displayName: 'Seguimiento',
    iconName: 'search', 
    route: '/ui-components/lists'
  },
  {
    displayName: 'Mis Documentos',
    iconName: 'folder',
    route: '/ui-components/document'
  }
];
