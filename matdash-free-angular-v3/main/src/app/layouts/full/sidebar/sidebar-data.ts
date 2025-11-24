import { NavItem } from './nav-item/nav-item';
import 'iconify-icon';


export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'mdi:view-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Ui Components',
    divider: true
  },
  {
    displayName: 'Lists',
    iconName: 'mdi:format-list-bulleted',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'mdi:menu',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tramite',
    iconName: 'mdi:form-select',
    route: '/ui-components/tramite',
  },
  {
    displayName: 'Documentos',
    iconName: 'mdi:file-document',
    route: '/ui-components/document',
  },
  {
    displayName: 'Tables',
    iconName: 'mdi:table',
    route: '/ui-components/tables',
  }
];
