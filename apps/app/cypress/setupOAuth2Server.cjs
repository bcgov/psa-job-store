const { OAuth2Server } = require('oauth2-mock-server');
const { exec } = require('child_process');

async function startServer() {
  let server = new OAuth2Server();
  await server.issuer.keys.generate('RS256');

  // Hook to modify the token before it's signed
  server.service.once('beforeTokenSigning', (token) => {
    const currentTime = Math.floor(Date.now() / 1000);
    // Customize your token payload here
    token.payload = {
      ...token.payload,
      exp: currentTime + 3000, // Token expiry time (e.g., 50 minutes from now)
      iat: currentTime, // Issued at time
      auth_time: currentTime - 100, // Authenticated time (example)
      jti: 'xxxx', // Unique identifier for the token
      iss: 'xxxx', // Issuer
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
  let token = await server.issuer.buildToken();
  process.env.CYPRESS_AUTH_TOKEN = token;
  console.log('OAuth2 Mock Server is running');
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
