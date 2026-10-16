
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error(
        'VITE_API_URL no está definida. Revisa el archivo .env del frontend.'
    );
}

export default API_URL.replace(/\/+$/, '');
