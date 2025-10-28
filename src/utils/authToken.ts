
const setTokenToLocalStorage = (token: string) => {
    if (!token) return;
    localStorage.setItem("auth_token", token);
};

const getTokenFromLocalStorage = (): string | null => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        return token;
    } else {
        return null
    }
};

const removeTokenFromLocalStorage = (): void => {
    localStorage.removeItem("auth_token");
};

export const authToken = {
    setTokenToLocalStorage,
    getTokenFromLocalStorage,
    removeTokenFromLocalStorage
};
