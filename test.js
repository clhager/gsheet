var GSheet = require('./googlesheets');
var async   = require('async');

var url = 'https://script.google.com/macros/s/AKfycbzei4DTwpNV1UFgD7uVniXLOrle489VL1V4UM0X6TxF5vgmQOc/exec';
var ID = '1bVaReDTArbcS_aBlSk4c2qPA1slthSKc3Uq3H0WnwqM';
var name = 'Data';

var sheet = new GSheet(url, ID, name);
//sheet.setOpts(ID, name);

sheet.setRow(0, ["BS", "Pink", "hi", "yo"]);
sheet.setRow(1, ["School", "Pink", "hi", "ho"]);
sheet.setRow(2, ["Stadium", "Pink", "hi", "2"]);
sheet.setRow(3, ["Stadium", "Pink", "hasdfasdfi", "3"]);

async.series([
	function(step) {
		sheet.getSheet(step);
	},
	function(step) {
		console.log(sheet);
		sheet.send();
	}
]);