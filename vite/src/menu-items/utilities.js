// assets
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconBuildingWarehouse } from '@tabler/icons-react';

import { FaStore } from "react-icons/fa";

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconBuildingWarehouse
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: '',
  type: 'group',
  children: [
    {
      id: "vendors",
      title: 'Vendors',
      type: 'item',
      url: 'vendor',
      icon: icons.IconBuildingWarehouse,
      breadcrumbs: false
    },
    {
      id: 'util-typography',
      title: 'Typographies',
      type: 'item',
      url: 'util-typography',
      icon: icons.IconTypography,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Color',
      type: 'item',
      url: '/utils/util-color',
      icon: icons.IconPalette,
      breadcrumbs: false
    },
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconShadow,
      breadcrumbs: false
    }
  ]
};

export default utilities;
