const { OAuth2Server } = require('oauth2-mock-server');
const { exec } = require('child_process');
const axios = require('axios');
require('dotenv').config();

async function startServer() {
  let server = new OAuth2Server();
  await server.issuer.keys.generate('RS256');

  // Hook to modify the token before it's signed
  server.service.once('beforeTokenSigning', (token, req) => {
    const currentTime = Math.floor(Date.now() / 1000);
    // Customize your token payload here
    token.payload = {
      exp: currentTime + 30000, // Token expiry time (e.g., 500 minutes from now)
      iat: currentTime, // Issued at time
      auth_time: currentTime - 100, // Authenticated time (example)
      jti: 'xxxx', // Unique identifier for the token
      iss: 'http://localhost:8080', // Issuer
      aud: 'xxxx', // Audience
      sub: 'xxxx', // Subject
      typ: 'Bearer', // Type of token
      azp: 'xxx', // Authorized party
      session_state: 'xxx', // Session state
      scope: 'xxx', // Scopes
      sid: 'xxxx', // Session ID
      idir_user_guid: 'xxx', // User GUID
      identity_provider: 'xxx', // Identity provider
      idir_username: 'test', // Username
      email_verified: false, // Email verification flag
      name: 'xxxx', // Name
      preferred_username: 'xxxx', // Preferred username
      display_name: 'Test, User CITZ:EX', // Display name
      given_name: 'Test', // Given name
      family_name: 'User', // Family name
      email: 'test.user@gov.bc.ca', // Email
    };
  });

  await server.start(8080, 'localhost');

  const response = await axios.post('http://localhost:8080/token', {
    grant_type: 'client_credentials',
  });

  const { VITE_KEYCLOAK_REALM_URL, VITE_KEYCLOAK_CLIENT_ID } = process.env;

  process.env.CYPRESS_AUTH_TOKEN = response.data.access_token;
  process.env.CYPRESS_VITE_KEYCLOAK_REALM_URL = VITE_KEYCLOAK_REALM_URL;
  process.env.CYPRESS_VITE_KEYCLOAK_CLIENT_ID = VITE_KEYCLOAK_CLIENT_ID;
  return server;
}

function startCypress() {
  exec('cypress open', (err, stdout, stderr) => {
    if (err) {
      console.error(`exec error: ${err}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

async function main() {
  await startServer();
  startCypress();
}

main();
