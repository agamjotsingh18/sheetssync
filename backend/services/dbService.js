const { query } = require('../config/database');

async function getRecords() {
  try {
    const result = await query('SELECT id, name, value from records');
    return result;
  } catch (error) {
    console.error('Error getting records:', error);
    throw error;
  }
}


async function getCount(id) {
  try {
    const sql = 'SELECT COUNT(*) from records WHERE id = ?';
    const result = await query.promise().sql(sql, [id]);
    return result;
  } catch (error) {
    console.error('Error getting records:', error);
    throw error;
  }
}


async function updateRecord(data) {
  try {
    const sql = 'INSERT INTO records (id, name, value) VALUES (?, ?, ?)';

    const result = await query(sql, data);
    return result;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
}

module.exports = { getRecords, updateRecord, getCount };