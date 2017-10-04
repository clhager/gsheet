# Google Spreadsheet Object API (Node.js)

This is Node.js module for creating Sheet objects that can fetch or push data to online Google Sheets.

- Local changes - all data fetched or pushed at once to preserve order
- Ability to create new Spreadsheets and link into emails

## Installation

- Move the folder into your work directory

- Copy the files in the "Google Apps" folder into a Google Apps Script

- Publish the Google Apps Script as yourself with anonymous access

## Basic Usage

```javascript
var GSheet = require('./googlesheets');
var async   = require('async');

var url = 'Google-App-Scripts-';
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
```

## API

### `GSheet`

The main class that represents a spreadsheet container object.


#### `new GSheet(app_exec_url, ID, sheet_name)`

Create a new spreadsheet container object.

- `app_exec_url` - exec url of published Google Apps Script
- `ID` - ID of the target spreadsheet
- `sheet_name` - name of target sheet

#### `setOpts(ID, name)`

Modifies the ID and name for the spreadsheet

- `ID` - string containing the new ID

- `name` - string containing the new sheet name

#### `setMaxWidth(maxWidth)`

Sets a max width for rows to add error checking for adding too many elements to a row

- `maxWidth` - value for the max width

#### `setRow(index, row)`

Sets the row at the specified index in the spreadsheet

- `index` - integer index for the new row (overwrites if there is already a row at that index)

- `row` - array containing the values for the row

----------------------------------

## Moving Forward
- Methods for storing and pulling NoSQL databases

## License
gsheets is free and unencumbered public domain software. For more information, see the accompanying UNLICENSE file.