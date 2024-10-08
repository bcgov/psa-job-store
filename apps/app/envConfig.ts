const {
  VITE_BACKEND_URL,
  VITE_KEYCLOAK_REALM_URL,
  VITE_KEYCLOAK_CLIENT_ID,
  VITE_KEYCLOAK_REDIRECT_URL,
  VITE_SUPPORT_EMAIL,
  VITE_ENV,
} = import.meta.env;

export {
  VITE_BACKEND_URL,
  VITE_ENV,
  VITE_KEYCLOAK_CLIENT_ID,
  VITE_KEYCLOAK_REALM_URL,
  VITE_KEYCLOAK_REDIRECT_URL,
  VITE_SUPPORT_EMAIL,
};
