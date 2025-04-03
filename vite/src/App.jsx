import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// routing
import router from "routes";

// defaultTheme
import themes from "themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";
import { toast, ToastContainer } from "react-toastify";
import { getUserState, removeUserDetails } from "store/storeUtility";
import { useEffect } from "react";
import { connectSocket, disconnectSocket } from "store/reducers/socketReducer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { updateCart } from "store/reducers/cartReducer";

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
axios.interceptors.request.use(
  async (config) => {
    // if (
    //   config.url.includes("/auth/login") ||
    //   config.url.includes("auth/register") ||
    //   config.url.includes("vendorPackage")
    // ) {
    //   console.log("token doesnt exists");
    //   return config;
    // } else {
    //   console.log("token exists");
    //   const token = await getUserState().token.access.token;
    //   console.log(token);
    //   if (token) {
    //     config.headers.Authorization = `${token}`;
    //   }
    // }

    try {
      const token = getUserState().token;
      console.log(token, "<=== wow");
      if (token === null || !token) {
        console.log("no token found");
        return config;
      }
      if (token || token !== null) {
        console.log("token found");
        config.headers.Authorization = `${token}`;
        return config;
      }
    } catch (e) {
      console.log(e, "<=== covered");
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // If the response is successful, simply return it
    return response;
  },
  async (error) => {
    const currentPath = window.location.pathname;
    // Skip the logout process if already on the login page
    if (currentPath === "/login") {
      return Promise.reject(error); // Return the error without further handling
    }

    // If the error response status is 401, log the user out
    if (error.response.status === 401) {
      // 1. Clear user session/token
      // await clearUserSession(); // Implement this function to remove the token from state/storage
      toast.warning("Session expired. Logging out...");
      // window.location.href = "/login"; // Adjust the route as per your app's login route
      window.location.replace("/login");
      removeUserDetails();
      // 2. Optionally, you can show a notification to the user

      // 3. Redirect to the login page

      // You could also use history.push("/login") if you're using React Router's history object
    }

    // Return the error to allow the component to handle it as well
    return Promise.reject(error);
  }
);

// ==============================|| APP ||============================== //

const App = () => {
  const dispatch = useDispatch();

  const customization = useSelector((state) => state.newCustomization);
  const cart = useSelector((state) => state.cart.data);

  function getExpiredItems() {
    const currentTime = new Date();
    return cart.filter((item) => new Date(item.expiryTime) <= currentTime);
  }

  useEffect(() => {
    dispatch(connectSocket());

    // Cleanup: Disconnect socket on unmount if needed
    return () => {
      dispatch(disconnectSocket());
    };
  }, [dispatch]);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const expiredItems = getExpiredItems();

  //     // If there are expired items, filter the cart and update
  //     if (expiredItems.length > 0) {
  //       const newCart = cart.filter((item) => new Date(item.expiryTime) > new Date());
  //       dispatch(updateCart(newCart));
  //     }
  //   }, 5000); // Check every 5 seconds

  //   // Cleanup interval on component unmount
  //   return () => clearInterval(intervalId);
  // }, [cart, dispatch]); // Add `cart` to dependency array to watch for changes

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <RouterProvider router={router} />
        </NavigationScroll>
      </ThemeProvider>
      <ToastContainer />
    </StyledEngineProvider>
  );
};

export default App;
