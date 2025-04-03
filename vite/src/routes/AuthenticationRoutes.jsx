import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";
import MinimalLayout from "layout/MinimalLayout";
// import { element } from 'prop-types';
import ProtectedRoute from "components/protectedRoute";
import VendorRegistration from "views/pages/authentication3/VendorRegistration";
import PackageSelection from "views/pages/authentication3/packageSelection";
const DashboardDefault = Loadable(lazy(() => import("views/dashboard")));

// login option 3 routing
const Option = Loadable(lazy(() => import("views/pages/authentication3/option")));
const AuthLogin3 = Loadable(lazy(() => import("views/pages/authentication3/Login3")));
const AuthRegister3 = Loadable(lazy(() => import("views/pages/authentication3/Register3")));
// const isAuthenticated=true
// const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
// const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
// const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import("views/sample-page")));

//error page
const ErrorPage = Loadable(lazy(() => import("views/pages/Error/errorPage")));
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/login",
      element: <AuthLogin3 />,
    },
    {
      path: "/register",
      element: <AuthRegister3 />,
    },
    {
      path: "/option",
      element: <Option />,
    },
    {
      path: "/vendorRegistration",
      element: <VendorRegistration />,
    },
    {
      path: "/selectPackage",
      element: <PackageSelection />,
    },
  ],
};

export default AuthenticationRoutes;
