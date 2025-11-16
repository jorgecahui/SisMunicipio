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
    displayName: 'Forms',
    iconName: 'mdi:form-select',
    route: '/ui-components/forms',
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
  },
  {
    divider: true,
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'mdi:login',
    route: '/authentication',
    children: [
      {
        displayName: 'Login',
         subItemIcon: true,
        iconName: 'mdi:login',
        route: '/authentication/login',
      },
    ],
  },
  {
    displayName: 'Register',
    iconName: 'person_add',
    route: '/authentication',
    children: [
      {
        displayName: 'Register',
         subItemIcon: true,
        iconName: 'arrow_right',
        route: '/authentication/register',
      },
      {
        displayName: 'Side Register',
         subItemIcon: true,
        iconName: 'arrow_right',
        route: 'https://matdash-angular-main.netlify.app/authentication/boxed-register',
        external: true,
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        chipContent: 'PRO',
      },
    ],
  },
  {
    displayName: 'Forgot Pwd',
    iconName: 'lock_reset',
    route: '/authentication',
    chip: true,
    children: [
      {
        displayName: 'Side Forgot Pwd',
         subItemIcon: true,
        iconName: 'arrow_right',
        route: 'https://matdash-angular-main.netlify.app/authentication/side-forgot-pwd',
        external: true,
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        chipContent: 'PRO',
      },
      {
        displayName: 'Boxed Forgot Pwd',
         subItemIcon: true,
        iconName: 'arrow_right',
        route: 'https://matdash-angular-main.netlify.app/authentication/boxed-forgot-pwd',
        external: true,
        chip: true,
        chipClass: 'bg-light-secondary text-secondary',
        chipContent: 'PRO',
      },
    ],
  },
];
