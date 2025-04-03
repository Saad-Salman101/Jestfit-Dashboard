import {
    IconBuildingWarehouse, IconMapPin, IconBook2,
    IconBrandBooking
} from "@tabler/icons-react";
import dashboard from "./dashboard";


const firstBlock = {
    id: 'customerFirstList',
    title: '',
    type: 'group',
    children: [
        {
            id: "customerBooking",
            title: 'Venues',
            type: 'item',
            url: '/bookNow',
            icon: IconBook2,
            breadcrumbs: false
        },
        {
            id: "bookings",
            title: 'Bookings',
            type: 'item',
            url: 'booking',
            icon: IconBrandBooking,
            breadcrumbs: false
        },
        // {
        //     id: "vendor",
        //     title: 'Vendors',
        //     type: 'item',
        //     url: '/vendor',
        //     icon: IconBuildingWarehouse,
        //     breadcrumbs: false
        // },
        // {
        //     id: "location",
        //     title: 'Venue',
        //     type: 'item',
        //     url: 'location',
        //     icon: IconMapPin,
        //     breadcrumbs: false
        // },
    ]
};


const customerMenu = {
    items: [dashboard, firstBlock]
}

export default customerMenu