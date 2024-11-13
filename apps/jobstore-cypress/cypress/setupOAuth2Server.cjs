const { exec } = require('child_process');
require('dotenv').config();

// Set up environment variables for Cypress
const setupEnvironment = () => {
  const { VITE_KEYCLOAK_REALM_URL, VITE_KEYCLOAK_CLIENT_ID, VITE_BACKEND_URL, VITE_E2E_AUTH_KEY } = process.env;

  process.env.CYPRESS_VITE_KEYCLOAK_REALM_URL = VITE_KEYCLOAK_REALM_URL;
  process.env.CYPRESS_VITE_KEYCLOAK_CLIENT_ID = VITE_KEYCLOAK_CLIENT_ID;
  process.env.CYPRESS_VITE_BACKEND_URL = VITE_BACKEND_URL;
  process.env.CYPRESS_VITE_E2E_AUTH_KEY = VITE_E2E_AUTH_KEY;
};

function startCypress() {
  exec('cypress open', { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

// Main execution
setupEnvironment();
startCypress();
