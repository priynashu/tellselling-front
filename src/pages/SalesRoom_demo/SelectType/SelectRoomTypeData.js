import { AllRoutes } from '../../../utils/AllRoutes';

import image1 from './thumbnails/digitalsalesroom.png';
import image2 from './thumbnails/digitalsalesroom-webinar.png';
import image3 from './thumbnails/digitalsalesroom-live.png';

export const SelectRoomTypeData = [
  {
    title: 'Digital Sales Room',
    description: `Micro-content pages and customer portals that have built-in virtual meetings booking and dynamic content creation capabilities, customer engagement analytics.`,
    features: ['micro-content pages', 'customer portals', 'virtual meetings booking', 'dynamic content creation','customer engagement analytics'],
    image: image1,
    navigateTo: AllRoutes.createRoom1,
  },
  {
    title: 'Digital Sales Room + Webinar',
    description: `Webinar hosting, micro-content pages and customer portals that have built-in virtual meetings booking and dynamic content creation capabilities, customer engagement analytics.`,
    features: ['webinar hosting', 'micro-content pages', 'customer portals', 'virtual meetings booking','dynamic content creation','customer engagement analytics'],
    image: image2,
    navigateTo: AllRoutes.createRoom2,
  },
  {
    title: 'Digital Sales Room + Live Streaming',
    description: `Live streaming event hosting, micro-content pages and customer portals that have built-in virtual meetings booking and dynamic content creation capabilities, customer engagement analytics.`,
    features: ['Live streaming event hosting', 'micro-content pages', 'customer portals', 'virtual meetings booking', 'dynamic content creation','customer engagement analytics'],
    image: image3,
    navigateTo: AllRoutes.createRoom3,
  },
];
