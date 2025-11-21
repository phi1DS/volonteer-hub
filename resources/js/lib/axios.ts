import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
});

if (typeof document !== 'undefined') {
    const token =
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
            ?.content ?? null;

    if (token) {
        axiosInstance.defaults.headers.common['X-CSRF-TOKEN'] = token;
    }
}

export const isAxiosError = axios.isAxiosError;

export default axiosInstance;
