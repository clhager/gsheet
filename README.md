# Google Spreadsheet Object API (Node.js)

This is Node.js module for creating Sheet objects that can fetch or push data to online Google Sheets.

- Local changes - all data fetched or pushed at once to preserve order
- Ability to create new Spreadsheets

Coming soon:

- Methods for storing and pulling NoSQL databases
- Security features

## Installation

Dependencies:

- Node "async"

Instructions:

- Move the folder into your work directory

- Copy the files in the "Google Apps" folder into a Google Apps Script

- Publish the Google Apps Script as yourself with anonymous access

- Run `node test.js` to verify functionality

## Basic Usage

```javascript
var GSheet = require('./googlesheets');
var async   = require('async');

var url = 'Google-App-Scripts-exec';
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
```

should give

```
Original Sheet:

----Spreadsheet----
  Name: Data
    Row 0: a; b; c; d;  ;
    Row 1: 1; 2; 3; 4;  ;
    Row 2: A; B; C; D; E;
    Row 3: 5; 6; 7;  ;  ;
-------------------

New Sheet:

----Spreadsheet----
  Name: Data
    Row 0: a; b; c; d;  ;
    Row 1: 1; 2; 3; 4;  ;
    Row 2: A; B; C; D; E;
    Row 3: 5; 6; 7;  ;  ;
-------------------

Updated Sheet:

----Spreadsheet----
  Name: Data
    Row 0: a; b; c; d;  ;
    Row 1: 1; 2; 3; 4;  ;
    Row 2: A; B; C; D; E;
    Row 3: 5; 6; 7;  ;  ;
    --empty row--
    Row 5: 8; 9;  ;  ;  ;
-------------------
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

#### `getRow(index)`

Returns an array with the values of the specified row

- `index` - integer index for the new row

#### `send()`

Sends the spreadsheet to update the target 

- `index` - integer index for the new row (overwrites if there is already a row at that index)

- `row` - array containing the values for the row

#### `sendTo(ID, name)`

Sends the spreadsheet to a specified target, ignoring the object target

- `ID` - string containing the new ID

- `name` - string containing the new sheet name
 
#### `get()`

Sends a GET request to the Google Apps Script

#### `sendToNewSpreadsheet(email)`

Creates a spreadsheet, dumps the data to it, and sends a link to the new spreadsheet to the specified email

- `email` - string containing the target email

Note - in development

#### `getSheet(callback)`

Fetches the sheet specified in the object options and updates the information in the object to match the online sheet, then executes the callback function

#### `getSheetFrom(ID, name, callback)`

Fetches the sheet specified in the parameters and updates the information in the object to match the online sheet, then executes the callback function

- `ID` - string containing the new ID

- `name` - string containing the new sheet name
 
#### `printSheet()`

Prints the spreadsheet to the command line

----------------------------------


## License
gsheets is free and unencumbered public domain software. For more information, see the accompanying UNLICENSE file.