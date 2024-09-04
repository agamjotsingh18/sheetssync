const { readSheet, writeSheet } = require('../services/googleService');
const { getRecords, updateRecord, getCount } = require('../services/dbService');
const { handleConflict } = require('../utils/conflictHandler');

async function syncData() {
  try {
    const sheetData = await readSheet('Sheet1!A2:D');
    const dbData = await getRecords();
    console.log(dbData, "this is dbData");

    const sheetDataMap = new Map(sheetData.map(row => [row[0], row.slice()]));

    for (const dbRow of dbData) {
      const sheetRow = sheetDataMap.get(dbRow.id.toString());

      if (sheetRow) {

      } else {
        try {
          await writeSheet('Sheet1!A:A', [
            [dbRow.id, dbRow.name, dbRow.value]
          ]);
        } catch (error) {
          console.error("Error inserting data", error);
        }
      }
    };

    for (const [id, row] of sheetDataMap) {

      const isIdPresent = dbData.some(item => item.id.toString() === row[0]);

      if (isIdPresent) {
        console.log(`ID ${row[0]} is present in the data.`);
      } else {
        console.log(`ID ${row[0]} is not present in the data.`);
        await updateRecord([parseInt(row[0], 10), row[1], row[2]]);
      }
    }
    console.log('Synchronization complete');
  } catch (error) {
    console.error('Error during synchronization:', error);
  }
}

module.exports = {
  syncData
};