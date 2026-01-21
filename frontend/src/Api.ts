/// <reference types="vite/client" />

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_CATEGORY_URL = `${API_BASE_URL}/categories`;
export const API_USER_URL = `${API_BASE_URL}/users`;
export const API_POST_URL = `${API_BASE_URL}/posts`;
export const API_COMMENT_URL = `${API_BASE_URL}/comments`;
