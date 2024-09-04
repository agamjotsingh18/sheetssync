const { readSheet, writeSheet } = require('../services/googleService');
const { getRecords, updateRecord } = require('../services/dbService');
const { handleConflict } = require('../utils/conflictHandler');

async function syncData() {
  try {
    const sheetData = await readSheet('Sheet1!A2:B');
    const dbData = await getRecords();

    // Compare and synchronize data
    const sheetDataMap = new Map(sheetData.map((row, index) => [index + 1, row]));

    const dbUpdates = [];
    const sheetUpdates = [];

    dbData.forEach(dbRow => {
      const sheetRow = sheetDataMap.get(dbRow.id);

      if (sheetRow) {
        if (sheetRow[1] !== dbRow.value) {
          const resolvedValue = handleConflict(sheetRow[1], dbRow.value);
          dbUpdates.push(updateRecord(dbRow.id, { name: sheetRow[0], value: resolvedValue }));
          sheetUpdates.push({ index: dbRow.id, value: resolvedValue });
        }
        sheetDataMap.delete(dbRow.id);
      }
    });

    sheetDataMap.forEach((row, index) => {
      dbUpdates.push(updateRecord(index, { name: row[0], value: row[1] }));
      sheetUpdates.push({ index, value: row[1] });
    });

    await Promise.all(dbUpdates);
    await Promise.all(sheetUpdates.map(update => writeSheet(`Sheet1!B${update.index + 2}`, [[update.value]])));

    console.log('Synchronization complete');
  } catch (error) {
    console.error('Error during synchronization:', error);
  }
}

module.exports = { syncData };