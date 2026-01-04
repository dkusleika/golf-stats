// Google Sheets API

const apiKey = 'AIzaSyDa9faejoXq72kPsdRZHAyBgDwdDXjtbUg';
const client_id =
  '414842801584-hklgogkkrdrmgeibae0bid0b5qvrekud.apps.googleusercontent.com';
const ss_id = '1kWHVRFINejCM7eN2D1q93wgBzJzODf-uYKxmNoqsiv0';

let tokenClient;

function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: apiKey,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  });
  gapiInited = true;
}

function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: client_id,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    callback: '', // defined later
  });
}
