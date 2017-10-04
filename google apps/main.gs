/*  
 * Processes a POST request, resizes the target sheet, and posts the new values
 */
function doPost(e) {
  var data = JSON.parse(JSON.parse(e.postData.contents));
  postDataToSheet(data);
  return ContentService.createTextOutput("It works!");
}

/*  
 * Processes a GET request and returns an object containing the sheet's values
 */
function doGet(e){
  var response;
  if (e.parameter.process == "getSheet") {
    response = getDataFromSheet(e.parameter.ID, e.parameter.name);
    return ContentService.createTextOutput(JSON.stringify(response))
  }
  else if (e.parameter.process == "newSpreadsheet") {
    //
  }
  return ContentService.createTextOutput("error");
}

/*
 * Gets and configures a sheet, then posts content to it
 */
function postDataToSheet(data) {
  var spreadSheet = SpreadsheetApp.openById(data["ID"]);
  var sheet = spreadSheet.getSheetByName(data["name"]);
  var newData = process(data.body, data.width, data.size);
  resize(sheet, data.width, data.size);
  sheet.clearContents();
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData);
}

/*
 * Retrieves data from a sheet and packages it in an object
 */
function getDataFromSheet(ID, name) {
  var obj = {};
  var spreadSheet = SpreadsheetApp.openById(ID);
  var sheet = spreadSheet.getSheetByName(name);
  obj.size = sheet.getLastRow();
  obj.width = sheet.getLastColumn();
  obj.body = {};
  var newRow = {};
  var data = sheet.getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
  for (var row in data) {
    obj.body[row] = {};
    for (var col in data[row]) {
      obj.body[row][col] = data[row][col];
    }
  }
  return obj;
}

function test() {
  Logger.log(getDataFromSheet("1bVaReDTArbcS_aBlSk4c2qPA1slthSKc3Uq3H0WnwqM", "Data"));
}
  