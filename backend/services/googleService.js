const { google } = require('googleapis');
const path = require('path');
const { GoogleAuth } = require('google-auth-library');
const dotenv = require('dotenv');

dotenv.config();

const spreadsheetId = process.env.GOOGLE_SHEET_ID;
const keyFilePath = path.resolve(__dirname, process.env.GOOGLE_SERVICE_ACCOUNT);

const auth = new GoogleAuth({
  keyFile: keyFilePath,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

async function readSheet(range) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    return response.data.values;
  } catch (error) {
    console.error('Error reading sheet:', error);
    throw error;
  }
}

async function writeSheet(range, values) {
  try {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      resource: { values },
    });
  } catch (error) {
    console.error('Error writing sheet:', error);
    throw error;
  }
}

module.exports = { readSheet, writeSheet };