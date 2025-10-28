
interface EnvConfig {
    VITE_BACKEND_URL: string;
    VITE_ASSET_URL: string;
    VITE_APP_NAME: string;
    VITE_APP_URL: string;
}

const loadEnvVariables = () => {
    const requiredEnvVariables: string[] = [
        "VITE_BACKEND_URL",
        "VITE_ASSET_URL",
        "VITE_APP_NAME",
        "VITE_APP_URL"
    ];

    requiredEnvVariables.forEach((key: string) => {
        if (!import.meta.env[key]) {
            throw new Error(`Missing required environment variable ${key}`);
        }
    })

    return {
        VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL as string,
        VITE_ASSET_URL: import.meta.env.VITE_ASSET_URL as string,
        VITE_APP_NAME: import.meta.env.VITE_APP_NAME as string,
        VITE_APP_URL: import.meta.env.VITE_APP_URL as string,
    }
}

export const envVars: EnvConfig = loadEnvVariables();