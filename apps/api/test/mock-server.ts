import PostmanLocalMockServer from '@jordanwalsh23/postman-local-mock-server';
import axios from 'axios';
import * as fs from 'fs';

enum Endpoint {
  Accounts = 'accounts',
  Contacts = 'contacts',
  Incidents = 'incidents',
  Query = 'queryResults',
}

const MOCK_API_URL = `http://localhost:3555`;

const request = (endpoint: Endpoint, extra?: string) =>
  axios.get(`${MOCK_API_URL}/${endpoint}${extra != null ? `?${extra}` : ''}`);

const options = {
  port: 3555,
  collection: JSON.parse(fs.readFileSync('./CRM_PROD.postman_collection.json', 'utf8')),
};

//Create a new server
const server = new PostmanLocalMockServer(options);
const idir = 'KSEAWARD';
//Start the server
server.start();

request(Endpoint.Accounts, `q=login='${idir.toLowerCase()}'`).then((res) => console.log(res));

// const accountId = response?.items.length > 0 ? (response.items[0].id as number) : null;
//Run some requests against your server
axios.get(`http://localhost:3555`).then((res) => {
  console.log(res);
  //do something with the mocked response.
});

//Stop the server
server.stop();
