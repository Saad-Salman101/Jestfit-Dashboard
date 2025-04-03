import { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
// import ProtectedRoute from "../components/protectedRoute"; // Import the ProtectedRoute component
// import SlotDisabler from "components/Field/SlotDisabler";
// import UpdateLocation from "components/location/updateLocation";
const UpdateLocation = Loadable(lazy(() => import("components/location/updateLocation")));
const SlotDisabler = Loadable(lazy(() => import("components/Field/SlotDisabler")));
const ProtectedRoute = Loadable(lazy(() => import("../components/protectedRoute")));
// import UpdateField from "components/Field/updateField";
const UpdateField = Loadable(lazy(() => import("../components/Field/updateField")));
const Vendor = Loadable(lazy(() => import("../components/vendor/vendor")));
const Customer = Loadable(lazy(() => import("components/customer/customer")));
const Location = Loadable(lazy(() => import("components/location/location")));
const Booking = Loadable(lazy(() => import("components/booking/booking")));
const Payments = Loadable(lazy(() => import("components/payment/payment")));
const Field = Loadable(lazy(() => import("components/Field/field")));
const CreateField = Loadable(lazy(() => import("components/Field/createField")));
const SportType = Loadable(lazy(() => import("components/sportType/sportType")));
const CreateSportType = Loadable(lazy(() => import("components/sportType/createSportType")));
const CustomerFieldView = Loadable(
  lazy(() => import("components/customerView/CustomerFieldView"))
);
const CustomerLocationView = Loadable(
  lazy(() => import("components/customerView/CustomerLocationView"))
);
const CustomerBooking = Loadable(
  lazy(() => import("components/customerView/customerBooking"))
);
const Cart = Loadable(lazy(() => import("components/cart/cart")));
const OrderDetails = Loadable(lazy(() => import("components/viewOrder/viewOrder")));
const UpdateOrderForm = Loadable(lazy(() => import("components/viewOrder/updateOrder")));
const UpdateVendor = Loadable(lazy(() => import("components/vendor/updateVendor")));
const FastBooking = Loadable(lazy(() => import("components/booking/fastBooking")));
// const LandingPage = Loadable(lazy(() => import("views/landingPage/landingPage")));

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import("views/dashboard")));

// utilities routing
const LocationCreation = Loadable(lazy(() => import("views/dashboard/createLocation")));

// const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));
// const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));

// sample page routing
// const SamplePage = Loadable(lazy(() => import("views/sample-page")));

const MainRoutes = {
  path: "/",
  element: <MainLayout />, // Default to login
  children: [
    {
      path: "/dashboard",
      element: <ProtectedRoute element={DashboardDefault} />,
    },
    {
      path: "/vendor",
      element: <ProtectedRoute element={Vendor} />,
    },
    {
      path: "/customer",
      element: <ProtectedRoute element={Customer} />,
    },
    {
      path: "/location",
      element: <ProtectedRoute element={Location} />,
    },
    {
      path: "/createLocation",
      element: <ProtectedRoute element={LocationCreation} />,
    },
    {
      path: "/updateLocation",
      element: <ProtectedRoute element={UpdateLocation} />,
    },
    {
      path: "/booking",
      element: <ProtectedRoute element={Booking} />,
    },
    {
      path: "/payment",
      element: <ProtectedRoute element={Payments} />,
    },
    {
      path: "/field",
      element: <ProtectedRoute element={Field} />,
    },
    {
      path: "/createField",
      element: <ProtectedRoute element={CreateField} />,
    },
    {
      path: "/updateField",
      element: <ProtectedRoute element={UpdateField} />,
    },
    {
      path: "/disableSlot/:fieldID",
      element: <ProtectedRoute element={SlotDisabler} />,
    },
    {
      path: "/sportType",
      element: <ProtectedRoute element={SportType} />,
    },
    {
      path: "/createSportType",
      element: <ProtectedRoute element={CreateSportType} />,
    },
    {
      path: "/bookNow",
      element: <ProtectedRoute element={CustomerLocationView} isBoth={true} />,
    },
    {
      path: "/customerfield",
      element: <ProtectedRoute element={CustomerFieldView} />,
    },
    {
      path: "/customerbooking",
      element: <ProtectedRoute element={CustomerBooking} isBoth={true} />,
    },
    {
      path: "/viewOrder",
      element: <ProtectedRoute element={OrderDetails} />,
    },
    {
      path: "/fastbooking",
      element: <ProtectedRoute element={FastBooking} />,
    },
    {
      path: "/cart",
      element: <ProtectedRoute element={Cart} />,
    },
    {
      path: "/updateOrder",
      element: <ProtectedRoute element={UpdateOrderForm} />,
    },
    {
      path: "/updateVendor",
      element: <ProtectedRoute element={UpdateVendor} />,
    },
    // {
    //   path: '/',
    //   children: [
    //     {
    //       path: 'util-typography',
    //       element: <UtilsTypography />
    //     }
    //   ]
    // },
  ],
};

export default MainRoutes;
