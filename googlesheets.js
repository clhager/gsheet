var async   = require('async');
var request = require('request');

var sheet = function (url, ID, name) {
	this.url = url;         // Url of the webapp published on Google App Scripts
	this.ID = ID;           // ID of the spreadsheet, found in the URL
	this.name = name;	    // Name of the sheet
	this.width = 0;		    // Number of columns
	this.maxWidth = false;  // Max width of a row to insert
	this.body = {};			// Body of our sheet object
	this.size = 0;			// Number of rows in our body
	this.wait = false;      // Used for synchronous execution

	/* Method: -- setOpts --
	 * 
	 * Description: Sets the ID and name of the sheet object
	 *
	 * Input:  String ID, String name
	 *
	 * Output: None
	 */
	this.setOpts = function(ID, name) {
		this.ID = ID;
		this.name = name;
	}

	/* Method: -- setMaxWidth --
	 * 
	 * Description: Sets a max width to prevent making rows with too many elements
	 *
	 * Input:  Integer index, Array row
	 *
	 * Output: Boolean true if no errors, false if errors
	 */
	this.setMaxWidth = function(maxWidth) {
		this.maxWidth = maxWidth;
	}

	/* Method: -- setRow --
	 * 
	 * Description: Sets the row at the i-th index to the values in row
	 *
	 * Input:  Integer index, Array row
	 *
	 * Output: Boolean true if no errors, false if errors
	 */
	this.setRow = function(index, row) {
		if ((this.maxWidth != false) && row.length > this.maxWidth) {
			return false;
		}
		if (row.length > this.width) {
			this.width = row.length;
		}
		var newRow = {};
		for (var i = 0; i < row.length; i++) {
			newRow[i] = row[i];
		}
		this.body[index] = newRow;
		this.size = (index + 1 > this.size) ? (index + 1) : this.size;
		return true;
	}

	/* Method: --getRow--
	 *
	 * Description: Returns an array with the values of the row
	 *
	 * Input: Integer index
	 *
	 * Output: Array of strings; missing values returned as empty strings; empty array if empty row and -1 if out of bounds
	 */
	this.getRow = function(index) {
		if (index > this.size - 1 || index < 0) {
			return -1;
		} else if (!this.body[index]) {
			return [];
		} else {
			var row = [];
			for (var i = 0; i < this.width; i++) {
				if (this.body[index][i]) {
					row.push(this.body[index][i]);
				} else {
					row.push("");
				}
			}
			return row;
		}
	}

	/* Method: -- send --
	 * 
	 * Description: Sends the object to the Google Sheet
	 *
	 * Input:  None
	 *
	 * Output: None
	 */
	this.send = function() {
		var settings = {
			method: "POST",
			json: JSON.stringify(this),
			uri: this.url
		};
		request(settings, function (error, response, body) {
			if (error) console.log(error);
			//console.log(body);
		});
		return;
	}

	/* Method: -- sendTo --
	 * 
	 * Description: Sends the object to the Google Sheet specified by the arguments (doesn't permanently affect the object)
	 *
	 * Input:  String ID, String name
	 *
	 * Output: None
	 */
	this.sendTo = function(ID, name) {
		var sID = this.ID;
		var sName = this.name;
		this.ID = ID;
		this.name = name;
		var settings = {
			method: "POST",
			json: JSON.stringify(this),
			uri: this.url
		};
		request(settings, function (error, response, body) {
			if (error) console.log(error);
			this.ID = sID;
			this.name = sName;
			//console.log(body);
		});
		return;
	}

	/* Method: -- get --
	 * 
	 * Description: Sends a get request for something to the Google Apps Script
	 *
	 * Input:  String query, Function callback
	 *
	 * Output: None
	 */
	this.get = function(query, callback) {
		var obj = this;
		obj.wait = true;
		var input;
		async.series([
			function(step) {
				request(obj.url + query, function (error, response, body) {
					if (error) console.log(error);
					var body = JSON.parse(body);
					input = body;
					step();
				});
			},
			function(step) {
				callback(input, obj);
				obj.wait = false;
				step();
			}
		]);
	}

	/* Method: -- sendToNewSpreadsheet --
	 * 
	 * Description: Sends the sheet to a new spreadsheet and emails a link to the supplied email
	 *
	 * Input:  String email
	 *
	 * Output: None
	 */
	this.sendToNewSpreadsheet = function(email) {
		this.get("?process=newSpreadsheet&email=" + email, function(input, obj) {
			obj.sendTo(input.ID, input.name);
		})
	}

	/* Method: -- getSheet --
	 * 
	 * Description: Modifies the existing sheet object to contain information from the online GSheet designated by the set ID and name
	 *
	 * Input:  Function callback
	 *
	 * Output: None; this object set to reflect online GSheet
	 */
	this.getSheet = function(callback) {
		this.get("?process=getSheet&ID=" + this.ID + "&name=" + this.name, function(input, obj) {
			obj.body = input.body;
			obj.maxWidth = false;
			obj.width = input.width;
			obj.size = input.size;
			callback();
		})
	}

	/* Method: -- getSheetFrom --
	 * 
	 * Description: Modifies the existing sheet object to contain information from the online GSheet designated by the supplied ID and name
	 *
	 * Input:  String ID, String name
	 *
	 * Output: None; this object set to reflect online GSheet
	 */
	this.getSheetFrom = function(ID, name, callback) {
		this.ID = ID;
		this.name = name;
		this.getSheet(callback());
	}

	/* Method: -- printSheet --
	 *
	 * Description: Prints out the sheet data in a structured form
	 *
	 * Input: None
	 *
	 * Output: None; spreadsheet printed to console
	 */
	this.printSheet = function() {
		console.log("\n----Spreadsheet----");
		console.log("  Name: " + this.name);
		for (var i = 0; i < this.size; i++) {
			if (this.body[i]) {
				var row = "    Row " + i + ": ";
				for (var j = 0; j < this.width; j++) {
					if (!this.body[i][j]) {
						row += " ; ";
						continue;
					}
					row += this.body[i][j] + "; ";
				}
				console.log(row);
			} else {
				console.log("    --empty row--")
			}
		}
		console.log("-------------------");
	}

	
}

module.exports = sheet;