/* Method: -- resize --
 *
 * Description: Resizes the target sheet to have a certain amount of rows and columns
 *
 * Input:  Sheet sheet, Integer numColumns, Integer numRows
 *
 * Output: None
 */
function resize(sheet, numColumns, numRows) {
  if (sheet.getMaxColumns() > numColumns) {
    sheet.deleteColumns(numColumns + 1, sheet.getMaxColumns() - numColumns);
  } else if (sheet.getMaxColumns() != numColumns) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), numColumns - sheet.getMaxColumns());
  }
  if (sheet.getMaxRows() > numRows) {
    sheet.deleteRows(numRows + 1, sheet.getMaxRows() - numRows);
  } else if (sheet.getMaxRows() != numRows) {
    sheet.insertRowsAfter(sheet.getMaxRows(), numRows - sheet.getMaxRows());
  }
}

/* Method: -- process --
 *
 * Description: Processes the sheet data and fits it into a nested array structure for the Google sheet
 *
 * Input:  Object data, Integer width, Integer size
 *
 * Output: Array (of arrays) newData
 */
function process(data, width, size) {
  var newData = new Array();
  var newRow = new Array();
  for (var i = 0; i < size; i++) {
    if (data[i]) {
      for (var j = 0; j < width; j++) {
        if (data[i][j]) {
          newRow.push(data[i][j]);
        } else {
          newRow.push("");
        }
      }
    } else {
      for (var j = 0; j < width; j++) {
        newRow.push("");
      }
    }
    newData.push(newRow);
    newRow = new Array();
  }
  return newData;
}

/*
 * Test for method -- process --
 */
function testProcess() {
  var spreadSheet = SpreadsheetApp.openById("1bVaReDTArbcS_aBlSk4c2qPA1slthSKc3Uq3H0WnwqM");
  var sheet = spreadSheet.getSheetByName("Data");
  var data = {0:{"0":"1", "1":"2"}, 1:{"0":"3", "1":"4"}, 3:{"0":"5", "1":"6"}};
  var newData = process(data, 2, 4);
  sheet.clearContents();
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
}