import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';
import { MENU_OPEN } from 'store/actions/actions';
import { menuOpen } from 'store/reducers/newCustomizationReducer';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.newCustomization.defaultId);
  const dispatch = useDispatch();
  return (
    // <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
    <ButtonBase disableRipple onClick={() => dispatch(menuOpen({id:defaultId}))} component={Link} to={"/dashboard"}>
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
