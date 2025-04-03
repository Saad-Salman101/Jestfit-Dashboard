import { createBrowserRouter } from "react-router-dom";

// routes
import MainRoutes from "./MainRoutes";
import LoginRoutes from "./AuthenticationRoutes";
import LandingPage from "views/landingPage/landingPage";
import CustomerLocationView from "components/customerView/CustomerLocationView";
import CustomerFieldView from "components/customerView/CustomerFieldView";
import CustomerBooking from "components/customerView/customerBooking";
import Cart from "components/cart/cart";

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/bookNowDirectly",
    element: <CustomerLocationView />,
  },
  {
    path: "/fieldDirectly",
    element: <CustomerFieldView />,
  },
  {
    path: "/customerbookingDirectly",
    element: <CustomerBooking />,
  },
  {
    path: "/cartDirectly",
    element: <Cart />,
  },
  LoginRoutes,
  MainRoutes,
]);

export default router;
