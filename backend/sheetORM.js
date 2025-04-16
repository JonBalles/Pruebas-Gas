class SheetsORM {
    constructor(spreadsheetId) {
      this.spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    }
  
    getSheet(sheetName) {
      const sheet = this.spreadsheet.getSheetByName(sheetName);
      if (!sheet) throw new Error(`Sheet "${sheetName}" not found`);
      return sheet;
    }
  
    getSheetNames() {
      return this.spreadsheet.getSheets().map(sheet => sheet.getName());
    }
  
    getSheetHeaders(sheetName) {
      const sheet = this.getSheet(sheetName);
      const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      return headers;
    }
  
    getSheetData(sheetName) {
      const sheet = this.getSheet(sheetName);
      const headers = this.getSheetHeaders(sheetName);
      const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
      return data.map(row => {
        const obj = {};
        headers.forEach((h, i) => obj[h] = row[i]);
        return obj;
      });
    }
  
    createRow(sheetName, dataObject) {
      const sheet = this.getSheet(sheetName);
      const headers = this.getSheetHeaders(sheetName);
      const row = headers.map(h => dataObject[h] || '');
      sheet.appendRow(row);
    }
  
    readRows(sheetName, filterFn) {
      const data = this.getSheetData(sheetName);
      return typeof filterFn === 'function' ? data.filter(filterFn) : data;
    }
  
    updateRows(sheetName, filterFn, updateFn) {
      const sheet = this.getSheet(sheetName);
      const headers = this.getSheetHeaders(sheetName);
      const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
      const values = dataRange.getValues();
  
      let updatedCount = 0;
  
      for (let i = 0; i < values.length; i++) {
        const rowObj = {};
        headers.forEach((h, j) => rowObj[h] = values[i][j]);
  
        if (filterFn(rowObj)) {
          const updatedRow = updateFn({ ...rowObj });
          headers.forEach((h, j) => {
            values[i][j] = updatedRow[h] || '';
          });
          updatedCount++;
        }
      }
  
      dataRange.setValues(values);
      return updatedCount;
    }
  
    deleteRows(sheetName, filterFn) {
      const sheet = this.getSheet(sheetName);
      const headers = this.getSheetHeaders(sheetName);
      const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  
      let rowsDeleted = 0;
      for (let i = data.length - 1; i >= 0; i--) {
        const rowObj = {};
        headers.forEach((h, j) => rowObj[h] = data[i][j]);
  
        if (filterFn(rowObj)) {
          sheet.deleteRow(i + 2); // +2 porque empieza en fila 2
          rowsDeleted++;
        }
      }
  
      return rowsDeleted;
    }
  }
  