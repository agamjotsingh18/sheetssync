function handleConflict(sheetValue, dbValue) {
    // Last write wins strategy
    return new Date().getTime() % 2 === 0 ? sheetValue : dbValue;
  }
  
  module.exports = { handleConflict };
  