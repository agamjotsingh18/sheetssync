const { google } = require('googleapis');
const path = require('path');
const { GoogleAuth } = require('google-auth-library');
const dotenv = require('dotenv');


dotenv.config();

const spreadsheetId = process.env.GOOGLE_SHEET_ID;
const keyFilePath = path.resolve(__dirname, process.env.GOOGLE_SERVICE_ACCOUNT);
const sheetName= "Sheet1";


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

  const firstEmptyRow = await getFirstEmptyRow(spreadsheetId);
  console.log("this is first empty row", firstEmptyRow);
    const appendRow = `${sheetName}!A${firstEmptyRow}`;
  
  try {
    await sheets.spreadsheets.values.append({
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



async function getFirstEmptyRow(spreadsheetId) {

  const sheets = google.sheets({ version: 'v4', auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:A`,
    });

    const rows = response.data.values || [];
    const rowCount = rows.length;
console.log(rowCount, "this is a row count");
    return rowCount+1;
} catch (error) {
    console.error('Error fetching row count:', error);
    throw error;
  }
}



module.exports = { readSheet, writeSheet };