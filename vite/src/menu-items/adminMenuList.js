import {
  IconBuildingWarehouse,
  IconMapPin,
  IconMoneybag,
  IconBrandBooking,
  IconSoccerField,
  IconBallFootball,
} from "@tabler/icons-react";
import dashboard from "./dashboard";

const firstBlock = {
  id: "vendorFirstList",
  title: "",
  type: "group",
  children: [
    {
      id: "vendor",
      title: "Vendors",
      type: "item",
      url: "/vendor",
      icon: IconBuildingWarehouse,
      breadcrumbs: false,
    },
    {
      id: "location",
      title: "Venues",
      type: "item",
      url: "location",
      icon: IconMapPin,
      breadcrumbs: false,
    },
    {
      id: "fields",
      title: "Fields",
      type: "item",
      url: "/field",
      icon: IconSoccerField,
      breadcrumbs: false,
    },

    // {
    //   id: "payment",
    //   title: "Payments",
    //   type: "item",
    //   url: "payment",
    //   icon: IconMoneybag,
    //   breadcrumbs: false,
    // },
    {
      id: "bookings",
      title: "Bookings",
      type: "item",
      url: "booking",
      icon: IconBrandBooking,
      breadcrumbs: false,
    },
    {
      id: "SportType",
      title: "Sport Types",
      type: "item",
      url: "sportType",
      icon: IconBallFootball,
      breadcrumbs: false,
    },
    {
      id: "fastBookings",
      title: "Create Fast Bookings",
      type: "item",
      url: "fastbooking",
      icon: IconBrandBooking,
      breadcrumbs: false,
    },
  ],
};

const adminMenuList = {
  items: [dashboard, firstBlock],
};

export default adminMenuList;
