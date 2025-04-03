import MinimalLayout from "layout/MinimalLayout";
import { element } from "prop-types";
import { lazy } from "react";

// project imports
import Loadable from "ui-component/Loadable";

const LandingPage = Loadable(lazy(() => import("views/landingPage/landingPage")));

//error page
const ErrorPage = Loadable(lazy(() => import("views/pages/Error/errorPage")));

const landingRoutes = {
  path: "/",
  element: <MinimalLayout />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/",
      element: <LandingPage />,
    },
  ],
};

export default landingRoutes;
