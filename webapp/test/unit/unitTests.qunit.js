/* global QUnit */

QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"prominion/test/unit/controller/App.controller"
	], function () {
		QUnit.start();
	});
}); 