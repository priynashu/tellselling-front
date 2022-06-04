import { AllRoutes } from '../../utils/AllRoutes';

import { FiHome, FiMail } from 'react-icons/fi';
import { BsChatLeft, BsCheck2Square } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';

// Defining all data for Sidebar

export const HomeData = [
  {
    name: 'Home',
    iconData: <FiHome />,
    routeTo: AllRoutes.homeRoute,
  },
];

export const AppsData = [
  {
    name: 'Digital Sales Room',
    iconData: <FiMail />,
    routeTo: AllRoutes.salesRoom,
  },
  {
    name: 'Resource Center',
    iconData: <BsChatLeft />,
    routeTo: AllRoutes.resourceCenter,
  },
  {
    name: 'Landing Pages',
    iconData: <BsCheck2Square />,
    routeTo: AllRoutes.landingPages,
  },
  {
    name: 'Forms',
    iconData: <FiHome />,
    routeTo: AllRoutes.forms,
  },
  {
    name: 'Insights',
    iconData: <FiHome />,
    routeTo: AllRoutes.insights,
  },
];

export const AdminData = [
  {
    name: 'Account',
    iconData: <FiMail />,
    routeTo: AllRoutes.account,
  },
  {
    name: 'Users',
    iconData: <BsChatLeft />,
    routeTo: AllRoutes.users,
  },
  {
    name: 'Commission Rules',
    iconData: <BsCheck2Square />,
    routeTo: AllRoutes.commissionRules,
  },
  {
    name: 'Billing',
    iconData: <AiOutlineCalendar />,
    routeTo: AllRoutes.billing,
  },
];
