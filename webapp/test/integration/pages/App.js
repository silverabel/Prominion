sap.ui.define([
	"sap/ui/test/Opa5",
  "sap/ui/test/actions/Press",
  'sap/ui/test/matchers/AggregationLengthEquals',
], function (Opa5, Press, AggregationLengthEquals) {
	"use strict";

	var sViewName = "prominion.view.App";

	Opa5.createPageObjects({
		onTheAppPage: {
			actions: {
				iPressTheDeleteButton: function () {
					return this.waitFor({
            controlType: "sap.m.Button",
            matchers: function(oButton) {
              return (oButton.oParent.getCells()[0].mProperties.text == "9789C07F-862F-4943-BDF1-1E5E93A521D0");
            },
						viewName: sViewName,
						actions: new Press(),
						errorMessage: "Did not find the button in the App view"
					});
				}
			},

			assertions: {
				tableRowShouldBeRemoved: function () {
					return this.waitFor({
            controlType: "sap.m.Table",
            viewName: sViewName,
            matchers: new AggregationLengthEquals({
              name: "items",
              length: 2
            }),
						success: function () {
							
							Opa5.assert.ok(true, "A row is removed");
						},
						errorMessage: "Row is not removed"
					});
				}
			}
		}
	});
});