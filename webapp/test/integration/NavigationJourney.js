/*global QUnit, opaTest*/

sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/App"
], function () {
	"use strict";

	QUnit.module("Deleting callbacks");

	opaTest("Should delete callback when button is pressed", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyAppInAFrame("../../index.html");

		//Actions
		When.onTheAppPage.iPressTheDeleteButton();

		// Assertions
		Then.onTheAppPage.tableRowShouldBeRemoved();

		// Cleanup
    Then.iTeardownMyApp();
	});
});