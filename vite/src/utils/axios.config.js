import axios from 'axios';
import { getUserState, removeUserDetails } from 'store/storeUtility';




axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL;
axios.interceptors.request.use(
    async (config) => {
        if (config.url.includes("/auth/login")) {
            return config
        }
        else {
            const token = await getUserState().token.access.token
            if (token) {
                config.headers.Authorization = `${token}`;
            }
        }


        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        if (response.status === 401) {
            removeUserDetails()
            window.location.replace("/")
        }

        // Handle successful responses globally
        return response;
    },
    (error) => {
        // Handle error responses globally
        return Promise.reject(error);
    }
);