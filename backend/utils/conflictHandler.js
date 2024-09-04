function handleConflict(sheetValue, dbValue) {
    return new Date().getTime() % 2 === 0 ? sheetValue : dbValue;
  }
  
  module.exports = { handleConflict };
  