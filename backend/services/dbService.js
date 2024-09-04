const db = require('../config/database');

async function getRecords() {
  const [rows] = await db.promise().query('SELECT * FROM records');
  return rows;
}

async function updateRecord(id, data) {
  const query = 'UPDATE records SET name = ?, value = ? WHERE id = ?';
  await db.promise().query(query, [data.name, data.value, id]);
}

module.exports = { getRecords, updateRecord };