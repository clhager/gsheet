var GSheet = require('./googlesheets');
var async   = require('async');

var url = 'Google-App-Scripts-Exec-URL';
var ID = 'Spreadsheet-ID';
var name = 'Sheet-Name';

var sheet = new GSheet(url, ID, name);
//sheet.setOpts(ID, name);

sheet.setRow(0, ["a", "b", "c", "d"]);
sheet.setRow(1, ["1", "2", "3", "4"]);
sheet.setRow(2, ["A", "B", "C", "D"]);

async.series([
	function(step) {
		sheet.getSheet(step);
	},
	function(step) {
		console.log(sheet);
		sheet.send();
	}
]);