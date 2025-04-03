// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import customerMenu from "menu-items/customerMenuList";
import vendorMenuList from 'menu-items/VendorMenuList';
import adminMenuList from 'menu-items/adminMenuList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userLogout } from 'store/actions/userActions';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
  const dispatch=useDispatch()
  const user =useSelector((state=>state.user));
    let role =user?.userDetail?.role;
    if(role===null){
      // dispatch(userLogout())
      // window.location.replace("/")
    }
    let type={...menuItem};
    switch(role){
      case "customer":
        type=customerMenu;
        break;
      case "vendor":
        type=vendorMenuList;
        break;
      case 'admin':
        type=adminMenuList;
        break;
      default:
      return
    }
  const navItems = type.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return <>{navItems}</>;
};

export default MenuList;
