const { sheets, spreadsheetId } = require('../services/googleService.js');

const sheetName="Sheet1";

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
        const response= await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource: { values: [values], },
        });

        console.log('Data inserted successfully:', response.data);
    } catch (error) {
        console.error('Error writing sheet:', error);
        throw error;
    }
}


module.exports = { readSheet, writeSheet };
