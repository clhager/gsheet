var GSheet = require('./googlesheets');
var async   = require('async');

var url = 'Google-App-Script-exec';
var ID = 'Spreadsheet-ID';
var name = 'Sheet-Name';

var sheet = new GSheet(url, ID, name);
var test = function(condition, name) {
	if (condition) {
		console.log("TEST " + name + ": Success");
	} else {
		console.log("TEST " + name + ": Failed");
	}
}

// Test setOpts
sheet.setOpts("myID", "myName");
var test_setOpts = sheet.ID == "myID" && sheet.name == "myName";
test(test_setOpts, "setOpts");

// Test setMaxWidth
sheet.setMaxWidth(5);
var test_setMaxWidth = sheet.ID == "myID" && sheet.name == "myName";
test(test_setMaxWidth, "setMaxWidth");

// Test setRow
var row = ["a", "abc", "a, b", "10", "$%@#"];
sheet.setRow(0, row);
var test_setRow = true;
for (var i = 0; i < row.length; i++) {
	test_setRow = test_setRow && sheet.getRow(0)[i] == row[i];
}
sheet.setRow(2, row);
for (var i = 0; i < row.length; i++) {
	test_setRow = test_setRow && sheet.getRow(2)[i] == row[i];
}
test_setRow = test_setRow && sheet.getRow(1).length == 0;
test_setRow = test_setRow && sheet.getRow(3) == -1;
test_setRow = test_setRow && sheet.getRow(-1) == -1;
test(test_setRow, "setRow");