var GSheet = require('./googlesheets');
var async   = require('async');

var url = 'Google-App-Script-exec';
var ID = 'Spreadsheet-ID';
var name = 'Sheet-Name';

var sheet = new GSheet(url, ID, name);

// Create and send a sheet
sheet.setRow(0, ["a", "b", "c", "d"]);
sheet.setRow(1, ["1", "2", "3", "4"]);
sheet.setRow(2, ["A", "B", "C", "D", "E"]);
sheet.setRow(3, ["5", "6", "7"]);

console.log("\nOriginal Sheet:")
sheet.printSheet();
sheet.send();

// Get a sheet
var newSheet = new GSheet(url, ID, name);
async.series([
	function(step) {
		newSheet.getSheet(step);
	},
	function(step) {
		console.log("\nNew Sheet:")
		newSheet.printSheet();
		step();
	},
	function(step) {
		newSheet.setRow(5, ["8", "9"]);
		console.log("\nUpdated Sheet:");
		newSheet.printSheet();
		newSheet.send()
		step();
	}
]);