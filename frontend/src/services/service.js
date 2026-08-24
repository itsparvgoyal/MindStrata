import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true 
});


// request interceptor ;attach krdo access token har req me 
api.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// response interceptor : exxpired token ko refresh kro 
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // check kro pehli baar hai and errorType expire toke hai 
        if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.errorType === "TokenExpired" &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true; // avoid infinite loops , impp

            try {
                // call the /refresh endpoint to get a new access token
                // we use standard axios here to avoid using the interceptor on the refresh call
                const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
                const response = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
                    { refreshToken },
                    { withCredentials: true }
                );

                const newToken = response.data.token;

                //local pe daal do 
                localStorage.setItem("token", JSON.stringify(newToken));

                // usko retry kro
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // If refreshing also fails (e.g. Refresh Token expired/invalidated)
                console.error("Refresh token failed, logging out user...", refreshError);
                
                // saaf krdo saab
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;