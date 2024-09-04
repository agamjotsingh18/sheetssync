const { sheets, spreadsheetId } = require('../services/googleService.js');

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
